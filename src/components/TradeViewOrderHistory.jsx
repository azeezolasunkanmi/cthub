import { UserAuth } from "../store/AuthContext";
import HistoryRow from "./HistoryRow";

const TradeViewOrderHistory = () => {
  const { presentUser } = UserAuth();

  return (
    <div>
      {presentUser?.orders?.filter(order => order.status === "close").length <
        1 && (
        <p className="flex justify-center items-center mt-[30px]">
          No open Trades
        </p>
      )}
      {presentUser?.orders
        .filter(order => order.status === "close")
        .map((data, i) => (
          <HistoryRow key={i} order={data} />
        ))}
    </div>
  );
};

export default TradeViewOrderHistory;
