import { useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../store/AuthContext";
import TradeViewAssets from "./TradeViewAssets";
import TradeViewOrders from "./TradeViewOrders";
import TradeViewOrderHistory from "./TradeViewOrderHistory";

const CounterShelf = () => {
  const [screen, setScreen] = useState("open-order");

  const { presentUser } = UserAuth();

  return (
    <div className="md:h-[30%] bg-textColor py-8 md:py-0">
      <div className="flex gap-6 text-[12px] border-b border-slate-700">
        <p
          className={`px-3 py-1 cursor-pointer ${
            screen === "open-order" ? "border-b-2" : ""
          }`}
          onClick={() => setScreen("open-order")}
        >
          OPEN ORDERS
        </p>
        <p
          className={`px-3 py-1 cursor-pointer ${
            screen === "trade-history" ? "border-b-2" : ""
          }`}
          onClick={() => setScreen("trade-history")}
        >
          TRADE HISTORY
        </p>
        <p
          className={`px-3 py-1 cursor-pointer ${
            screen === "assets" ? "border-b-2" : ""
          }`}
          onClick={() => setScreen("assets")}
        >
          ASSETS
        </p>
      </div>
      <section className="overflow-y-scroll h-full text-[14px] px-4">
        {screen === "assets" && <TradeViewAssets />}
        {screen === "open-order" && <TradeViewOrders />}
        {screen === "trade-history" && <TradeViewOrderHistory />}
        {!presentUser && (
          <p className="text-center text-[14px] mt-14">
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
      </section>
    </div>
  );
};

export default CounterShelf;
