import { UserAuth } from "../store/AuthContext";
import OrderRow from "./OrderRow";
// import OrderHead from "./OrderHead";

const TradeViewOrders = () => {
  const { presentUser } = UserAuth();

  return (
    <div className="px-2">
      {/* <OrderHead /> */}
      {presentUser?.orders?.filter(order => order.status === "open").length <
        1 && (
        <p className="flex justify-center items-center mt-[30px]">
          No open Orders
        </p>
      )}
      {presentUser?.orders &&
        presentUser?.orders
          .filter(order => order.status === "open")
          .map((data, i) => <OrderRow key={i} order={data} />)}
    </div>
  );
};

export default TradeViewOrders;
