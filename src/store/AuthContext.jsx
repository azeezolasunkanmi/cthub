import { createContext, useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userProfile, setUserProfile] = useState("");
  const [presentUser, setPresentUser] = useState({});
  const [baseCurrency, setBaseCurrency] = useState("USDT");
  const [quoteCurrency, setQuoteCurrency] = useState("BTC");
  const [pairs, setPairs] = useState("BTCUSDT");
  const [isUnderMaintenance, setIsUnderMaintenance] = useState(false);
  const [tradeRate, setTradeRate] = useState(false);

  const { response: bitcoinResponse } = useAxios(`coins/bitcoin`);
  const { response: ethereumResponse } = useAxios(`coins/ethereum`);
  const { response: tetherResponse } = useAxios(`coins/tether`);

  const usersCollectionRef = collection(db, "users");
  const adminCollectionRef = collection(db, "config");

  const getAdminData = async () => {
    try {
      const data = await getDocs(adminCollectionRef);
      const filteredData = data.docs.map(doc => ({
        ...doc.data(),
        docId: doc.id,
      }));

      setIsUnderMaintenance(filteredData[0].maintenance);
      setTradeRate(filteredData[0].tradeRate);
      // console.log(filteredData[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const getCurrentUser = async () => {
    if (auth.currentUser) {
      try {
        const data = await getDocs(usersCollectionRef);

        const filteredData = data.docs.map(doc => ({
          ...doc.data(),
          docId: doc?.id,
        }));
        const presentUsers = filteredData.filter(
          data => data.id === auth.currentUser.uid
        );
        // console.log(presentUser[0]);
        setPresentUser(presentUsers[0]);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const updatePrices = async () => {
    // Calculate totalBalance by summing up balances from assets
    const newTotalBalance = presentUser?.assets.reduce((total, asset) => {
      let priceInUSD = 0;
      if (asset.symbol === "bitcoin") {
        priceInUSD =
          bitcoinResponse.market_data.current_price.usd * asset.balance;
      } else if (asset.symbol === "ethereum") {
        priceInUSD =
          ethereumResponse.market_data.current_price.usd * asset.balance;
      } else if (asset.symbol === "tether") {
        priceInUSD =
          tetherResponse.market_data.current_price.usd * asset.balance;
      }
      return total + priceInUSD;
    }, 0);
    setPresentUser(prevState => {
      // Return the updated state object
      return {
        ...prevState,
        totalBalance: newTotalBalance,
      };
    });
    updateUser(presentUser?.docId, {
      totalBalance: newTotalBalance,
    });
  };

  function convertCryptoAmount(amount, fromCurrency, toCurrency) {
    // Extract current prices
    const bitcoinPrice = bitcoinResponse?.market_data.current_price.usd;
    const ethereumPrice = ethereumResponse?.market_data.current_price.usd;
    const tetherPrice = tetherResponse?.market_data.current_price.usd;

    // Define a map to easily retrieve prices
    const priceMap = {
      bitcoin: bitcoinPrice,
      ethereum: ethereumPrice,
      tether: tetherPrice,
    };

    let convertedAmount;

    // Convert from one cryptocurrency to another
    if (fromCurrency !== "tether" && toCurrency !== "tether") {
      // Convert from 'fromCurrency' to USD, then from USD to 'toCurrency'
      const usdAmount = amount * priceMap[fromCurrency]; // Convert to USD
      convertedAmount = usdAmount / priceMap[toCurrency]; // Convert from USD to 'toCurrency'
    } else if (fromCurrency === "tether") {
      // Convert from tether to the desired cryptocurrency
      convertedAmount = amount / priceMap[toCurrency];
    } else if (toCurrency === "tether") {
      // Convert from the cryptocurrency to tether
      convertedAmount = amount * priceMap[fromCurrency];
    }

    return convertedAmount;
  }

  const deleteUser = async id => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  const updateUser = async (id, data) => {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, data);
  };

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = email => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateWithdrawal = () => {
    const activityIndex = presentUser?.activity?.findIndex(
      res => res.pending === false && res.processed === false
    );

    if (pairs && activityIndex !== -1) {
      const assetIndex = presentUser?.assets?.findIndex(
        res => res.symbol === presentUser?.activity[activityIndex].name
      );
      // console.log(presentUser.assets[assetIndex]);

      const updatedActivity = [...presentUser.activity];
      const updatedAssets = [...presentUser.assets];
      const previousBalance = updatedAssets[assetIndex].balance;

      if (previousBalance >= updatedActivity[activityIndex].quantity) {
        updatedAssets[assetIndex] = {
          ...updatedAssets[assetIndex],
          balance: previousBalance - updatedActivity[activityIndex].quantity,
        };
        setPresentUser(prevState => ({
          ...prevState,
          assets: updatedAssets,
        }));
        updatedActivity[activityIndex] = {
          ...updatedActivity[activityIndex],
          processed: true,
          status: "Completed",
        };
        setPresentUser(prevState => ({
          ...prevState,
          activity: updatedActivity,
        }));
        updateUser(presentUser.docId, {
          assets: updatedAssets,
          activity: updatedActivity,
        });
        getCurrentUser();
      } else {
        updatedActivity[activityIndex] = {
          ...updatedActivity[activityIndex],
          status: "Insufficient Funds",
          processed: true,
        };
      }
    } else {
      console.log("Object with the specified ID not found.");
    }
  };

  useEffect(() => {
    getAdminData();
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      getCurrentUser();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateWithdrawal();
      updatePrices();
    }, 5000); // Delay execution for 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer to prevent memory leaks
  }, [presentUser?.activity]);

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        logout,
        signIn,
        resetPassword,
        setUser,
        userProfile,
        setUserProfile,
        getCurrentUser,
        deleteUser,
        presentUser,
        setPresentUser,
        updateUser,
        baseCurrency,
        setBaseCurrency,
        quoteCurrency,
        setQuoteCurrency,
        pairs,
        setPairs,
        updatePrices,
        convertCryptoAmount,
        isUnderMaintenance,
        tradeRate,
        updateWithdrawal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
