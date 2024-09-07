import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Loader from "./Loader";
import PropTypes from "prop-types";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useEffect } from "react";
import { currencyFormat } from "../utils";
import SwapModal from "./SwapModal";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import tetherImg from "../assets/Tether.webp";
import ethImg from "../assets/ethereum.png";
import btcImg from "../assets/bitcoinSmall.png";
import { UserAuth } from "../store/AuthContext";

const PortfolioRow = ({ asset }) => {
  const { response, loading } = useAxios(`coins/${asset.symbol}`);
  const [toggle, setToggle] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("tether");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [formTouched, setFormTouched] = useState(false);
  const {
    getCurrentUser,
    convertCryptoAmount,
    setPresentUser,
    presentUser,
    updateUser,
  } = UserAuth();

  // console.log(response);
  const assetName = response?.name.toLowerCase();
  useEffect(() => {
    validateForm();
  }, [fromValue]);

  if (loading) {
    return (
      <div className="flex justify-center items-center gap-2 mt-20">
        <Loader />
      </div>
    );
  }

  const changeToValue = () => {
    // setFromValue("");
    if (asset.symbol === "bitcoin") {
      if (toValue === "tether") {
        setToValue("ethereum");
      } else setToValue("tether");
    }
    if (asset.symbol === "ethereum") {
      if (toValue === "tether") {
        setToValue("bitcoin");
      } else setToValue("tether");
    }
    if (asset.symbol === "tether") {
      if (toValue === "bitcoin") {
        setToValue("ethereum");
      } else setToValue("bitcoin");
    }
  };

  const validateForm = () => {
    // Initialize formErrors as an empty object
    let newFormErrors = {};

    // Check each validation rule and add errors to newFormErrors object
    if (fromValue === "") {
      newFormErrors = { ...newFormErrors, value: "Input desired amount" };
    } else if (fromValue > asset.balance) {
      newFormErrors = {
        ...newFormErrors,
        value: "You have exceeded your available balance",
      };
    }

    setFormErrors(newFormErrors);
  };

  // update prices in balance after new swap
  const onNewSwap = () => {
    const index = presentUser.assets.findIndex(res => res.symbol === assetName);
    // console.log(presentUser[index]);

    if (index !== -1) {
      const updatedAssets = [...presentUser.assets];
      const previousBalance = updatedAssets[index].balance;

      updatedAssets[index] = {
        ...updatedAssets[index],
        balance: previousBalance - fromValue,
      };
      if (toValue === "tether") {
        const usdtIndex = updatedAssets.findIndex(
          asset => asset.symbol === "tether"
        );
        const previousUsdtBalance = updatedAssets[usdtIndex].balance;
        updatedAssets[usdtIndex] = {
          ...updatedAssets[usdtIndex],
          balance:
            previousUsdtBalance +
            convertCryptoAmount(fromValue, assetName, "tether"),
        };
      }
      if (toValue === "bitcoin") {
        const btcIndex = updatedAssets.findIndex(
          asset => asset.symbol === "bitcoin"
        );
        const previousBtcBalance = updatedAssets[btcIndex].balance;
        updatedAssets[btcIndex] = {
          ...updatedAssets[btcIndex],
          balance:
            previousBtcBalance +
            convertCryptoAmount(fromValue, assetName, "bitcoin"),
        };
      }
      if (toValue === "ethereum") {
        const ethIndex = updatedAssets.findIndex(
          asset => asset.symbol === "ethereum"
        );
        const previousEthBalance = updatedAssets[ethIndex].balance;
        updatedAssets[ethIndex] = {
          ...updatedAssets[ethIndex],
          balance:
            previousEthBalance +
            convertCryptoAmount(fromValue, assetName, "ethereum"),
        };
      }

      setPresentUser(prevState => ({
        ...prevState,
        assets: updatedAssets,
      }));
      updateUser(presentUser.docId, {
        assets: updatedAssets,
      });
      getCurrentUser();
    } else {
      console.log("Object with the specified ID not found.");
    }
  };

  const onConfirmSwap = e => {
    e.preventDefault();
    setFormTouched(true);
    if (Object.keys(formErrors).length === 0) {
      setFormTouched(false);
      setIsSubmit(true);
      onNewSwap();
      setFromValue("");
      console.log("Form is submitted 😀");
      setTimeout(() => {
        setIsSubmit(false);
        setOpenModal(false);
      }, 2000);
    } else {
      console.log("Form has errors, please correct them.");
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 border-b border-slate-600 py-4 text-white">
        <div className="md:flex gap-2 w-[25%] md:w-[20%] shrink-0">
          <p>
            <img src={response?.image.thumb} alt="coin logo" />
          </p>
          <p>{response?.name}</p>
          <p>{response?.symbol}</p>
        </div>
        <div className="md:w-[15%] w-[25%] shrink-0">
          <p>{asset.balance.toFixed(4)}</p>
        </div>

        <div className="md:w-[15%] w-[25%] shrink-0">
          {currencyFormat(
            response?.market_data.current_price.usd * asset.balance
          )}
        </div>

        <div className="hidden md:block w-[15%]">
          <Link
            to="/dashboard/deposit"
            className="py-1 px-4 bg-green-400 rounded-md"
          >
            Deposit
          </Link>
        </div>

        <div className="hidden md:block w-[15%]">
          <Link
            to="/dashboard/withdraw"
            className="py-1 px-4 bg-red-400 rounded-md"
          >
            Withdraw
          </Link>
        </div>
        <div className="hidden md:block w-[10%]">
          <button
            onClick={() => setOpenModal(true)}
            className="py-1 px-4 bg-blue-400 rounded-md"
          >
            Swap
          </button>
        </div>

        {/* MOBILE */}
        <div className="md:hidden relative">
          <BsThreeDotsVertical onClick={() => setToggle(!toggle)} />
          {toggle && (
            <div
              className="absolute right-0 top-4 p-2 text-[12px]"
              onClick={() => setToggle(!toggle)}
            >
              <p>
                <Link
                  to="/dashboard/deposit"
                  className="block px-2 py-1 mb-2 bg-green-400 rounded-md w-full"
                >
                  Deposit
                </Link>
              </p>
              <p>
                <Link
                  to="/dashboard/withdraw"
                  className="block px-2 py-1 mb-2 bg-red-400 rounded-md w-full"
                >
                  Withdraw
                </Link>
              </p>
              <p>
                <button
                  onClick={() => setOpenModal(true)}
                  className="block px-2 py-1 bg-blue-400 rounded-md w-full"
                >
                  Swap
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
      <SwapModal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="my-8">
          {isSubmit && (
            <p className="bg-green-500 text-center p-2 text-textColor mx-6 rounded-md">
              Swap successfully 🙂
            </p>
          )}
          <form onSubmit={onConfirmSwap}>
            <div className="border rounded p-4">
              <label htmlFor="from" className="text-slate-400">
                From
              </label>
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  id="to"
                  value={fromValue}
                  placeholder="0.00"
                  className="p-2 w-[80%] text-[21px] outline-none"
                  onChange={e => setFromValue(e.target.value)}
                />
                <span className="flex items-center gap-1 px-2 rounded-xl bg-slate-100 uppercase">
                  <img
                    src={response?.image.thumb}
                    alt="coin logo"
                    className="w-4 h-4"
                  />
                  {response?.symbol}
                </span>
              </div>
              {formTouched && formErrors.value && (
                <p className="text-red-500 text-[14px]">{formErrors.value}</p>
              )}
              <div className="flex justify-between">
                <p>Balance: {asset.balance?.toFixed(5)}</p>
                <p>
                  {currencyFormat(
                    convertCryptoAmount(fromValue, assetName, "tether")
                  )}
                </p>
              </div>
            </div>
            <p className="flex justify-center my-1">
              <HiOutlineSwitchVertical size={30} />
            </p>
            <div className="border rounded p-4">
              <label htmlFor="to" className="text-slate-400">
                To
              </label>{" "}
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  id="to"
                  value={
                    fromValue &&
                    convertCryptoAmount(fromValue, assetName, toValue)?.toFixed(
                      5
                    )
                  }
                  placeholder="0.00"
                  className="p-2 w-[80%] text-[21px] outline-none"
                  readOnly
                />
                <span
                  className="flex items-center gap-1 px-2 rounded-xl bg-slate-100 uppercase cursor-pointer"
                  onClick={changeToValue}
                >
                  <img
                    src={
                      toValue === "bitcoin"
                        ? btcImg
                        : toValue === "ethereum"
                        ? ethImg
                        : tetherImg
                    }
                    alt="coin logo"
                    className="w-4 h-4"
                  />
                  {toValue === "bitcoin"
                    ? "BTC"
                    : toValue === "ethereum"
                    ? "ETH"
                    : "USDT"}
                  <CgArrowsExchangeAltV size={34} />
                </span>
              </div>
            </div>
            <div className="my-4">
              <button className="bg-blue-500 w-full rounded py-1 text-white font-semibold">
                Swap
              </button>
            </div>
          </form>
        </div>
      </SwapModal>
    </>
  );
};

PortfolioRow.propTypes = {
  asset: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
  }).isRequired,
};

export default PortfolioRow;
