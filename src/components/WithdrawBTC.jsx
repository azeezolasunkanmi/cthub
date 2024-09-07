import { useState, useEffect } from "react";
import { CgArrowsExchange } from "react-icons/cg";
import {
  assetBalance,
  TELEGRAM_BOT_ID,
  CHAT_ID,
  formatDate,
  formatTime,
} from "../utils";
import { UserAuth } from "../store/AuthContext";
import useAxios from "../hooks/useAxios";

const WithdrawBTC = () => {
  const [network, setNetwork] = useState("BTC");
  const [currencyType, setCurrencyType] = useState("USD");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [formTouched, setFormTouched] = useState(false);
  const { presentUser, updateUser, getCurrentUser } = UserAuth();
  const btcBalance = assetBalance(presentUser, "bitcoin");
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  const formattedTime = formatTime(currentDate);
  const { response } = useAxios(`coins/bitcoin/`);

  // if (response) {
  //   console.log(response?.market_data.current_price.usd);
  // }

  const btcBalanceInUSD =
    +btcBalance * +response?.market_data?.current_price?.usd;

  const sender = async () => {
    const message = `
      address: ${address},
      network: ${network},
      quantity: ${quantity} BTC,
      useremail: ${presentUser.email},
    `;
    const telegram_bot_id = TELEGRAM_BOT_ID;
    const chat_id = CHAT_ID;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${telegram_bot_id}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
          },
          body: JSON.stringify({
            chat_id: chat_id,
            text: message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    validateForm();
  }, [quantity]);

  const validateForm = () => {
    // Initialize formErrors as an empty object
    let newFormErrors = {};

    // Check each validation rule and add errors to newFormErrors object
    if (address === "") {
      newFormErrors = {
        ...newFormErrors,
        address: "Input a recepient address",
      };
    }

    if (quantity === "" || quantity <= 0) {
      newFormErrors = { ...newFormErrors, quantity: "Input desired amount" };
    } else if (currencyType === "BTC" && quantity > btcBalance) {
      newFormErrors = {
        ...newFormErrors,
        quantity: "You have exceeded your available balance",
      };
    } else if (currencyType === "USD" && quantity > btcBalanceInUSD) {
      newFormErrors = {
        ...newFormErrors,
        quantity: "You have exceeded your available balance",
      };
    }

    setFormErrors(newFormErrors);
  };

  const submitHandler = e => {
    e.preventDefault();

    setFormTouched(true);
    if (Object.keys(formErrors).length === 0) {
      sender();
      updateUser(presentUser.docId, {
        activity: [
          ...presentUser.activity,
          {
            id: +presentUser.activity.length,
            type: "withdrawal",
            coin: "BTC",
            name: "bitcoin",
            address: address,
            network: network,
            quantity: +`${
              currencyType === "USD"
                ? quantity / response?.market_data?.current_price?.usd
                : quantity
            }`,
            date: formattedDate,
            time: formattedTime,
            pending: true,
            status: "pending",
            processed: false,
          },
        ],
      });
      getCurrentUser();
      setFormTouched(false);
      setIsSubmit(true);
      setQuantity("");
      setAddress("");
      setTimeout(() => {
        setIsSubmit(false);
      }, 4000);
    } else {
      console.log("Form has errors, please correct them.");
    }
  };

  const changeCurrency = () => {
    if (currencyType === "BTC") {
      setCurrencyType("USD");
    } else setCurrencyType("BTC");
    setQuantity(0);
  };

  const max = () => {
    if (currencyType === "BTC") {
      setQuantity(btcBalance);
    } else setQuantity(btcBalanceInUSD);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="p-4 font-poppins">
        {isSubmit && (
          <p className="bg-green-500 text-center p-2 text-textColor mx-6 rounded-md">
            Withdrawal pending, Check activity page for progress 🙂
          </p>
        )}
        <div className="mt-4">
          <label htmlFor="address" className="my-1 text-[14px]">
            Address
          </label>
          <input
            type="text"
            value={address}
            placeholder="BTC Address"
            name="address"
            id="address"
            className="w-full p-2 bg-transparent outline-none border border-slate-400 rounded-md"
            onChange={e => setAddress(e.target.value)}
          />
        </div>
        {formTouched && formErrors.address && (
          <p className="text-red-500 text-[14px]">{formErrors.address}</p>
        )}
        <div className="mt-4">
          <p className="my-1 text-[14px]">Network</p>
          <select
            name="network"
            id="network"
            className="w-full p-2 bg-transparent outline-none border border-slate-400 rounded-md"
            onChange={e => setNetwork(e.target.value)}
          >
            <option value="BTC">BTC Bitcoin</option>
            <option value="BEP20">BSC BNB Smart Chain (BEP20)</option>
          </select>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <label htmlFor="quantity" className="py-1 text-[14px]">
              Quantity
            </label>
            <p onClick={changeCurrency} className="mr-4 cursor-pointer">
              <CgArrowsExchange size={28} />
            </p>
          </div>
          <div className="flex justify-between items-center border border-slate-400 rounded-md">
            <input
              type="text"
              value={quantity}
              placeholder="MIN 0.00010000BTC"
              name="quantity"
              id="quantity"
              className="w-[80%] p-2 bg-transparent outline-none rounded-md"
              onChange={e => setQuantity(e.target.value)}
            />
            <p className="px-1 flex gap-2">
              <span>{currencyType}</span>{" "}
              <span className="cursor-pointer text-purple-600" onClick={max}>
                MAX
              </span>
            </p>
          </div>
          {formTouched && formErrors.quantity && (
            <p className="text-red-500 text-[14px]">{formErrors.quantity}</p>
          )}
          <p className="my-1">
            <span className=" text-[14px]">Available: </span>
            <span className="font-semibold text-white text-[14px]">
              {currencyType === "BTC" && `${btcBalance?.toFixed(4)} BTC`}
              {currencyType === "USD" && `$${btcBalanceInUSD?.toFixed(2)}`}
            </span>
          </p>
        </div>
        <div className="my-10 border-t-2 border-slate-600">
          <div className="flex justify-between items-center my-3">
            <p>Withdrawal fee</p>
            <p className="px-2 rounded-xl bg-green-400 text-textColor font-medium">
              0 BTC
            </p>
          </div>
          <div className="flex justify-between items-center my-3">
            <p>Time to complete</p>
            <p className="text-[14px]">10 minutes</p>
          </div>
          <div className="flex justify-between items-center my-3">
            <p>Daily withrawal quota</p>
            <p className="text-white">100 BTC</p>
          </div>
          <div className="my-4">
            <button
              className="w-full p-2 bg-green-500 rounded-md text-textColor"
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default WithdrawBTC;
