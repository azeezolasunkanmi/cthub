import PropTypes from "prop-types";
import { currencyFormat, assetBalance } from "../utils";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { UserAuth } from "../store/AuthContext";

const OrderRow = ({ order }) => {
  const [mobileToggle, setMobileToggle] = useState(false);
  const { presentUser, setPresentUser, updateUser, getCurrentUser } =
    UserAuth();

  const usdtBalance = assetBalance(presentUser, "tether");
  const profit = (order.rate / 100) * order.amount;

  const balancePrices = () => {
    const index = presentUser.assets.findIndex(res => res.symbol === "tether");

    if (index !== -1) {
      const updatedAssets = [...presentUser.assets];
      updatedAssets[index] = {
        ...updatedAssets[index],
        balance: usdtBalance + profit + order.amount,
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

  const closeTrade = () => {
    const index = presentUser.orders.findIndex(res => res.id === order.id);

    if (index !== -1) {
      const updatedOrders = [...presentUser.orders];
      updatedOrders[index] = { ...updatedOrders[index], status: "close" };
      setPresentUser(prevState => ({
        ...prevState,
        orders: updatedOrders,
      }));
      updateUser(presentUser.docId, {
        orders: updatedOrders,
      });
      getCurrentUser();
    } else {
      console.log("Object with the specified ID not found.");
    }
  };

  const closeTradeHandler = () => {
    balancePrices();
    closeTrade();
  };

  return (
    <>
      <div className="hidden md:flex items-center border-b border-slate-600 py-4 text-white">
        <div
          className={`w-[10%] capitalize ${
            order.side === "buy" ? "text-green-500" : "text-red-500"
          }`}
        >
          {order.side}
        </div>
        <div className="w-[15%] capitalize">{order.type}</div>
        <div className="w-[20%]">
          <p>{order.date}</p>
          <p>{order.time}</p>
        </div>
        <div className="w-[15%]">{order.pair}</div>
        <div className="w-[15%]">{currencyFormat(order.amount)}</div>
        {/* <p
          className={`w-[15%] ${
            profit < 0 ? "text-red-400" : "text-green-400"
          }`}
        >
          {currencyFormat(profit)}
        </p> */}
        <div className="w-[10%]">
          <button
            className="px-4 py-2 bg-red-500 rounded-md"
            onClick={closeTradeHandler}
          >
            Close
          </button>
        </div>
      </div>
      {/* mobile */}
      <div className="flex justify-between gap-2 items-center border-b border-slate-600 text-[14px] py-4 md:hidden">
        <div className="w-[20%] shrink-0">
          <p
            className={`capitalize ${
              order.side === "buy" ? "text-green-500" : "text-red-500"
            }`}
          >
            {order.side}
          </p>
          <p>{order.type}</p>
        </div>
        <div className="w-[30%]">
          <p className="">{order.pair}</p>
          <div className="">
            <p>{order.date}</p>
            <p>{order.time}</p>
          </div>
        </div>
        <div className="w-[30%] flex flex-col gap-2">
          <p className="">{currencyFormat(order.amount)}</p>
          {/* <p className={`${profit < 0 ? "text-red-400" : "text-green-400"}`}>
            {currencyFormat(profit)}
          </p> */}
        </div>

        <p
          className="relative w-[5%]"
          onClick={() => setMobileToggle(!mobileToggle)}
        >
          <BsThreeDotsVertical />
          {mobileToggle && (
            <button
              className=" absolute top-5 right-1 px-4 py-2 bg-red-500 rounded-md"
              onClick={closeTradeHandler}
            >
              Close
            </button>
          )}
        </p>
      </div>
    </>
  );
};

OrderRow.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    pair: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    side: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
  }).isRequired,
};

export default OrderRow;
