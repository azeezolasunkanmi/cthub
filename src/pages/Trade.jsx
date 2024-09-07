import TradingViewWidget from "../components/TradingViewWidget";
import OrderBook from "../components/OrderBook";
import TradeShelf from "../components/TradeShelf";
import CounterShelf from "../components/CounterShelf";

const Trade = () => {
  return (
    <div
      className="md:flex bg-textColor text-[#848e9c] md:overflow-hidden"
      style={{ height: "calc(100vh - 56px)" }}
    >
      <div className="md:w-[70%] lg:w-[60%]">
        <div className="border border-slate-600 h-full">
          <TradingViewWidget />
          <CounterShelf />
        </div>
      </div>
      <div className="hidden lg:block lg:w-[17%] bg-textColor">
        <OrderBook />
      </div>
      <div className="md:w-[30%] lg:w-[23%] bg-textColor">
        <TradeShelf />
      </div>
    </div>
  );
};

export default Trade;
