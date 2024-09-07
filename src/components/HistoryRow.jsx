import PropTypes from "prop-types";
import { currencyFormat } from "../utils";

const HistoryRow = ({ order }) => {
  const profit = (order.rate / 100) * order.amount;

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
        <div className="w-[15%]">{order.type}</div>
        <div className="w-[20%]">
          <p>{order.date}</p>
          <p>{order.time}</p>
        </div>
        <div className="w-[15%]">{order.pair}</div>
        <div className="w-[15%]">{currencyFormat(order.amount)}</div>
        <div
          className={`w-[15%] ${
            profit < 0 ? "text-red-400" : "text-green-400"
          }`}
        >
          {currencyFormat(profit)}
        </div>
        <div className="w-[10%]">{order.rate}%</div>
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
        <div className="w-[25%] flex flex-col gap-2">
          <p className="">{currencyFormat(order.amount)}</p>
          <p className={`${profit < 0 ? "text-red-400" : "text-green-400"}`}>
            {profit}
          </p>
        </div>

        <p className="relative w-[10%]">{order.rate}%</p>
      </div>
    </>
  );
};

HistoryRow.propTypes = {
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

export default HistoryRow;
