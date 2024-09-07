import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../store/AuthContext";
// import useAxios from "../hooks/useAxios";
import { assetBalance, formatDate, formatTime } from "../utils";

const TradeShelf = () => {
  const [tradeType, setTradeType] = useState("sell");
  const [tradeOptions, setTradeOptions] = useState("market");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(10);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [formTouched, setFormTouched] = useState(false);

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  const formattedTime = formatTime(currentDate);

  // const { response } = useAxios(`coins/bitcoin`);

  // if (response) {
  //   // console.log(response);
  // } else {
  //   console.log("no response");
  // }

  const {
    presentUser,
    updateUser,
    baseCurrency,
    quoteCurrency,
    pairs,
    getCurrentUser,
    convertCryptoAmount,
    setPresentUser,
    tradeRate,
  } = UserAuth();

  const usdtBalance = assetBalance(presentUser, "tether");

  // update prices in balance after new trade
  const onNewTrade = () => {
    const index = presentUser.assets.findIndex(res => res.symbol === "tether");

    if (index !== -1) {
      const updatedAssets = [...presentUser.assets];
      updatedAssets[index] = {
        ...updatedAssets[index],
        balance: usdtBalance - amount,
      };
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

  const onSubmit = e => {
    e.preventDefault();
    setFormTouched(true);
    if (Object.keys(formErrors).length === 0) {
      setFormTouched(false);
      setIsSubmit(true);
      onNewTrade();
      updateUser(presentUser.docId, {
        orders: [
          ...presentUser.orders,
          {
            id: +presentUser.orders.length,
            amount: +amount,
            date: formattedDate,
            time: formattedTime,
            pair: pairs,
            side: tradeType,
            status: "open",
            type: tradeOptions,
            rate: tradeRate,
          },
        ],
      });

      setAmount("");
      setPrice("");
      setRate(10);
      getCurrentUser();
      console.log("Form is submitted 😀");

      setTimeout(() => {
        setIsSubmit(false);
      }, 2000);
    } else {
      console.log("Form has errors, please correct them.");
    }
  };

  const validateForm = () => {
    // Initialize formErrors as an empty object
    let newFormErrors = {};

    // Check each validation rule and add errors to newFormErrors object
    if (amount === "") {
      newFormErrors = { ...newFormErrors, amount: "Input desired amount" };
    } else if (amount > usdtBalance) {
      newFormErrors = { ...newFormErrors, amount: "You need more USDT" };
    }

    if (tradeOptions === "market" && rate > 100) {
      newFormErrors = { ...newFormErrors, rate: "100% max" };
    } else if (tradeOptions === "market" && rate <= 9) {
      newFormErrors = { ...newFormErrors, rate: "At least 10%" };
    }
    if (tradeOptions === "limit" && price === "") {
      newFormErrors = { ...newFormErrors, price: "input a value" };
    } else if (tradeOptions === "limit" && price > usdtBalance) {
      newFormErrors = {
        ...newFormErrors,
        price: "stoploss cannot be more than available balance",
      };
    }

    // Update the formErrors state with the new errors
    setFormErrors(newFormErrors);

    // console.log(newFormErrors); // Log the new errors
  };

  useEffect(() => {
    validateForm();
  }, [amount, rate, price]);

  // console.log(presentUser);

  return (
    <div className="border border-slate-600 h-full">
      <nav className="w-[90%] mt-4 mx-auto border border-slate-600 flex justify-center rounded cursor-pointer">
        <p
          className={`w-[50%] p-1 text-[12px] text-center rounded-l ${
            tradeType === "buy" ? "bg-green-500 text-white" : ""
          }`}
          onClick={() => setTradeType("buy")}
        >
          Buy
        </p>
        <p
          className={`w-[50%] p-1 text-[14px] text-center rounded-r ${
            tradeType === "sell" ? "bg-red-500 text-white" : ""
          }`}
          onClick={() => setTradeType("sell")}
        >
          Sell
        </p>
      </nav>
      <div className="w-[90%] my-4 mx-auto flex justify-center items-center gap-10 text-[14px]">
        <p
          className={`cursor-pointer shrink-0 ${
            tradeOptions === "market" ? "border-b-2" : ""
          } ${tradeType === "buy" ? "border-green-500" : "border-red-500"}`}
          onClick={() => setTradeOptions("market")}
        >
          Market
        </p>
        <p
          className={`cursor-pointer shrink-0 
            ${tradeOptions === "limit" ? "border-b-2" : ""} ${
            tradeType === "buy" ? "border-green-500" : "border-red-500"
          }`}
          onClick={() => setTradeOptions("limit")}
        >
          Limit
        </p>
      </div>
      {isSubmit && (
        <p className="bg-green-500 text-center p-2 text-textColor mx-6 rounded-md">
          Trade successfully 🙂
        </p>
      )}
      <section className="w-[90%] my-4 mx-auto font-poppins">
        <p className="text-[14px]">
          <span className="text-white">Available:</span> {usdtBalance} USDT
        </p>
        <form onSubmit={onSubmit}>
          {tradeOptions === "limit" && (
            <div>
              <span className="flex justify-between mt-4 border p-2 rounded border-slate-600 text-[13px]">
                <input
                  id="price"
                  type="text"
                  placeholder="Price"
                  className="bg-inherit outline-none"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
                <p className="shrink-0">{baseCurrency}</p>
              </span>
              {formTouched && formErrors.price && (
                <p className="text-red-500 text-[14px]">{formErrors.price}</p>
              )}
            </div>
          )}

          <div>
            <span className="flex justify-between mt-4 border p-2 rounded border-slate-600 text-[13px]">
              <input
                id="amount"
                type="number"
                placeholder="Amount"
                className="bg-inherit outline-none"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
              <p>{baseCurrency}</p>
            </span>
            {formTouched && formErrors.amount && (
              <p className="text-red-500 text-[14px]">{formErrors.amount}</p>
            )}
          </div>

          <div>
            <span className="flex justify-between my-4 border p-2 rounded border-slate-600 text-[13px]">
              <input
                id="value"
                type="text"
                placeholder="Value"
                className="bg-inherit outline-none"
                value={
                  amount && convertCryptoAmount(amount, "tether", "bitcoin")
                }
                readOnly
              />
              <p>{quoteCurrency}</p>
            </span>
          </div>

          {tradeOptions === "market" && (
            <div>
              <label htmlFor="rate" />
              <span className="flex justify-between mt-4 border p-2 rounded border-slate-600 text-[13px]">
                <input
                  id="rate"
                  type="text"
                  placeholder="Rate"
                  className="bg-inherit outline-none"
                  value={rate}
                  onChange={e => setRate(e.target.value)}
                />
                <p>% Rate</p>
              </span>
              {formTouched && formErrors.rate && (
                <p className="text-red-500 text-[14px]">{formErrors.rate}</p>
              )}
            </div>
          )}
          <p
            className={`flex justify-center my-2 items-center rounded text-white ${
              tradeType === "buy" ? " bg-green-500" : " bg-red-500"
            }`}
          >
            <button className="w-full text-[14px] p-2" type="submit">{`${
              tradeType === "buy"
                ? `Buy ${baseCurrency}`
                : `Sell ${baseCurrency}`
            }`}</button>
          </p>
        </form>
      </section>
      {!presentUser && (
        <p className="text-center text-[14px]">
          <Link to="/login" className="text-blue-500">
            Log in
          </Link>{" "}
          or{" "}
          <Link to="/signup" className="text-blue-500">
            Register
          </Link>{" "}
          to start.
        </p>
      )}
    </div>
  );
};

export default TradeShelf;
