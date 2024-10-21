import PortfolioRow from "../components/PortfolioRow";
import OrderRow from "../components/OrderRow";
import HistoryRow from "../components/HistoryRow";
import { UserAuth } from "../store/AuthContext";
import { currencyFormat } from "../utils";
import { FiRefreshCcw } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { useState } from "react";
import OrderHead from "../components/OrderHead";
import PortfolioHead from "../components/PortfolioHead";
import HistoryRowHead from "../components/HistoryRowHead";

const Dashboard = () => {
  const { user, presentUser, updatePrices, convertCryptoAmount } = UserAuth();
  const [filter, setFilter] = useState("all");
  if (user) {
    // console.log(user);
    // console.log(presentUser);
  }

  return (
    <div className="bg-textColor text-[#848e9c] p-4 lg:p-10 font-poppins">
      {!user.emailVerified && (
        <h2 className="h-[70px] items-center flex border border-slate-600 rounded-md border-l-8 border-l-blue-500 md:text-[18px] pl-4">
          Verify your account! Check your email for verification link.
        </h2>
      )}
      <div className="my-10" onClick={updatePrices}>
        <div>
          <p>Total value</p>
        </div>
        <div className="flex gap-4 items-center">
          <h2 className="text-white text-[28px] font-semibold">
            {presentUser?.totalBalance &&
              currencyFormat(presentUser?.totalBalance)}
          </h2>
          {user.uid === "ciW21ohJ23NA5479XSRLATst8vi2" ? (
            <CiLock size={25} className="cursor-pointer" />
          ) : (
            <FiRefreshCcw size={25} className="cursor-pointer" />
          )}
        </div>

        <p className="text-[14px]">{`=${convertCryptoAmount(
          presentUser?.totalBalance,
          "tether",
          "bitcoin"
        )} BTC`}</p>
      </div>
      {user.uid === "ciW21ohJ23NA5479XSRLATst8vi2" ? (
        <div className="p-4 flex gap-4 items-center bg-yellow-200 rounded-md text-black">
          <div>
            <IoWarningOutline color="red" size={25} />
          </div>
          <p>
            Your account is currently on hold. Your need to complete a deposit
            of <span className="text-red-400"> $5000 </span> and upgrade to
            premium to get extra features.
          </p>
        </div>
      ) : (
        ""
      )}
      <div className="my-8">
        <h2 className="text-[24px] font-semibold text-white mb-4">Portfolio</h2>
        <section className="min-h-[200px] border border-slate-600 rounded-md px-4">
          <PortfolioHead />
          {presentUser?.assets &&
            presentUser?.assets.map((data, i) => (
              <PortfolioRow key={i} asset={data} />
            ))}
        </section>
      </div>
      <div className="my-8">
        <h2 className="text-[24px] font-semibold text-white mb-1">
          Open orders
        </h2>
        <div className="flex items-center gap-4 py-2">
          <span>
            <p className="text-[14px]">Side</p>
            <select
              name="pairs"
              id="pairs"
              className="w-[150px] p-1 bg-transparent outline-none border border-slate-400 rounded-md"
              onChange={e => setFilter(e.target.value)}
            >
              <option value="all">ALL</option>
              <option value="sell">SELL</option>
              <option value="buy">BUY</option>
            </select>
          </span>
          <span>
            <p className="text-[14px]">Type</p>
            <select
              name="pairs"
              id="pairs"
              className="w-[150px] p-1 bg-transparent outline-none border border-slate-400 rounded-md"
              onChange={e => setFilter(e.target.value)}
            >
              <option value="all">ALL</option>
              <option value="limit">Limit</option>
              <option value="market">Market</option>
            </select>
          </span>
        </div>
        <section className="min-h-[200px] border border-slate-600 rounded-md px-4">
          <OrderHead />

          {filter === "all" &&
            presentUser?.orders &&
            presentUser?.orders
              .filter(order => order.status === "open")
              .map((data, i) => <OrderRow key={i} order={data} />)}
          {presentUser?.orders &&
            filter === "all" &&
            presentUser.orders.length === 0 && (
              <p className="p-4 text-center text-[18px]">No trades yet?</p>
            )}
          {filter === "buy" &&
            presentUser?.orders &&
            presentUser?.orders
              .filter(order => order.status === "open" && order.side === "buy")
              .map((data, i) => <OrderRow key={i} order={data} />)}
          {presentUser?.orders &&
            filter === "buy" &&
            presentUser.orders.length === 0 && (
              <p className="p-4 text-center text-[18px]">No trades yet?</p>
            )}
          {filter === "sell" &&
            presentUser?.orders &&
            presentUser?.orders
              .filter(order => order.status === "open" && order.side === "sell")
              .map((data, i) => <OrderRow key={i} order={data} />)}
          {presentUser?.orders &&
            filter === "sell" &&
            presentUser.orders.length === 0 && (
              <p className="p-4 text-center text-[18px]">No trades yet?</p>
            )}
          {filter === "limit" &&
            presentUser?.orders &&
            presentUser?.orders
              .filter(
                order => order.status === "open" && order.type === "limit"
              )
              .map((data, i) => <OrderRow key={i} order={data} />)}
          {presentUser?.orders &&
            filter === "limit" &&
            presentUser.orders.length === 0 && (
              <p className="p-4 text-center text-[18px]">No trades yet?</p>
            )}
          {filter === "market" &&
            presentUser?.orders &&
            presentUser?.orders
              .filter(
                order => order.status === "open" && order.type === "market"
              )
              .map((data, i) => <OrderRow key={i} order={data} />)}
          {presentUser?.orders &&
            filter === "market" &&
            presentUser.orders.length === 0 && (
              <p className="p-4 text-center text-[18px]">No trades yet?</p>
            )}
        </section>
      </div>
      <div className="my-8">
        <h2 className="text-[24px] font-semibold text-white mb-4">
          Transaction history
        </h2>
        <section className="min-h-[200px] border border-slate-600 rounded-md px-4">
          <HistoryRowHead />
          {presentUser?.orders &&
            presentUser?.orders
              .filter(order => order.status === "close")
              .map((data, i) => <HistoryRow key={i} order={data} />)}
          {presentUser?.orders &&
            presentUser?.orders.filter(order => order.status === "close")
              .length === 0 && (
              <p className="p-4 text-center text-[18px]">No trade history</p>
            )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

// const used = {
//   firstName: "Klay",
//   nationality: "",
//   meansOfId: {
//     type: "",
//     idNum: "",
//     country: "",
//     expDate: "",
//     file: null,
//   },
//   email: "klayjay@mail.com",
//   activity: [
//     {
//       quantity: 500,
//       coin: "USDT",
//       pending: true,
//       date: "Jun. 11, 2024",
//       type: "Withdrawal",
//       processed: false,
//       status: "pending",
//       id: 0,
//       time: "10:44 PM UTC",
//       name: "tether",
//       address: "kdfjbhfgujfkgnh9854u950i046i095659",
//       network: "ETH Ethereum (ERC20)",
//     },
//     {
//       status: "pending",
//       coin: "BTC",
//       id: 1,
//       processed: false,
//       type: "Withdrawal",
//       network: "BTC",
//       time: "10:45 PM UTC",
//       date: "Jun. 11, 2024",
//       quantity: 0.0484895,
//       name: "bitcoin",
//       pending: true,
//       address: "dksvjkvi49857469tuj54igo4j09goi",
//     },
//   ],
//   assets: [
//     { symbol: "bitcoin", balance: 2.4858 },
//     { balance: 1.45223, symbol: "ethereum" },
//     { balance: 10736, symbol: "tether" },
//   ],
//   id: "ReXroHH4BFf5eGRKXXDiWWy71Tt2",
//   lastName: "Jay",
//   tel: "",
//   totalBalance: 183125.2717892,
//   orders: [
//     {
//       status: "open",
//       rate: 40,
//       id: 0,
//       pair: "BTCUSDT",
//       time: "10:37 PM UTC",
//       amount: 3000,
//       date: "Jun. 11, 2024",
//       type: "market",
//       side: "sell",
//     },
//     {
//       type: "limit",
//       id: 1,
//       date: "Jun. 11, 2024",
//       side: "sell",
//       status: "close",
//       pair: "BTCUSDT",
//       time: "10:37 PM UTC",
//       amount: 400,
//       rate: 40,
//     },
//     {
//       pair: "BTCUSDT",
//       id: 2,
//       time: "10:39 PM UTC",
//       type: "limit",
//       amount: 4700,
//       side: "buy",
//       date: "Jun. 11, 2024",
//       status: "close",
//       rate: 40,
//     },
//     {
//       amount: 790,
//       id: 3,
//       pair: "BTCUSDT",
//       time: "10:39 PM UTC",
//       side: "buy",
//       type: "market",
//       rate: 40,
//       date: "Jun. 11, 2024",
//       status: "close",
//     },
//     {
//       amount: 200,
//       side: "buy",
//       pair: "BTCUSDT",
//       status: "close",
//       id: 4,
//       type: "market",
//       time: "10:41 PM UTC",
//       date: "Jun. 11, 2024",
//       rate: 40,
//     },
//     {
//       pair: "BTCUSDT",
//       rate: 40,
//       type: "market",
//       status: "open",
//       id: 5,
//       amount: 2000,
//       date: "Jun. 11, 2024",
//       side: "buy",
//       time: "10:41 PM UTC",
//     },
//   ],
//   emailIsVerified: false,
//   dob: "",
//   gender: "",
//   docId: "zVVVG8xOHkQyxZynpymT",
// };
