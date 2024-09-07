import { IoIosArrowBack } from "react-icons/io";
import WithdrawUSDT from "../components/WithdrawUSDT";
import WithdrawBTC from "../components/WithdrawBTC";
import WithdrawETH from "../components/WithdrawETH";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../store/AuthContext";
import pick1 from "../assets/pick-1.png";
import pick2 from "../assets/pick-2.png";
import pick3 from "../assets/pick-3.png";

const Withdrawal = () => {
  const [currentScreen, setCurrentScreen] = useState("btc");
  const { presentUser } = UserAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-[91vh] bg-textColor text-[#848e9c] p-4 md:p-10 font-poppins">
      <div
        className="flex gap-3 items-center cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <IoIosArrowBack color="white" size={20} />
        <h2 className="text-[24px] font-semibold text-white">Withdraw</h2>
      </div>
      <section className="my-10">
        <div className="md:flex justify-center gap-10 items-center">
          <div className="relative mt-4 mx-auto md:mx-0 w-[250px] h-[230px] box-shadow bg-slate-800 flex justify-center gap-4 flex-col items-center">
            <span className="absolute right-4 top-1 text-[54px]">1</span>
            <img src={pick1} alt="icon" className="w-[80px]" />
            <h2 className="text-center w-[80%]">
              Select the digital currency you want to Withdraw
            </h2>
          </div>
          <div className="relative mt-4 mx-auto md:mx-0 w-[250px] h-[230px] box-shadow bg-slate-800 flex justify-center gap-4 flex-col items-center">
            <span className="absolute right-4 top-1 text-[54px]">2</span>
            <img src={pick2} alt="icon" className="w-[80px]" />

            <h2 className="text-center w-[80%]">
              Select the Network for the transfer
            </h2>
          </div>
          <div className="relative mt-4 mx-auto md:mx-0 w-[250px] h-[230px] box-shadow bg-slate-800 flex justify-center gap-4 flex-col items-center">
            <span className="absolute right-4 top-1 text-[54px]">3</span>
            <img src={pick3} alt="icon" className="w-[80px]" />
            <h2 className="text-center w-[80%]">
              Input the quantity you wish to withdraw and click submit
            </h2>
          </div>
        </div>
        <div className="pt-8">
          {!presentUser?.meansOfId?.status && (
            <h2 className="bg-neutral-200 text-textColor border-l-8 border-red-500 py-4 px-2 rounded-md max-w-[60%] mx-auto">
              Complete your profile and verification to complete your
              withdrawal. Ignore this message if you have completed your
              verification
            </h2>
          )}
        </div>
        <div className="mt-20">
          <div className="border border-slate-600 rounded-md mx-auto max-w-[500px] box-shadow">
            <div className="p-4">
              <h3 className="text-center my-6">
                Please select the currency you want to Withdraw
              </h3>
              <nav className="flex justify-center gap-6 border-b-2 border-slate-600">
                <p
                  className={`rounded rounded-b-none py-2 px-4 cursor-pointer ${
                    currentScreen === "btc"
                      ? " border-2 border-slate-600 text-white"
                      : ""
                  }`}
                  onClick={() => setCurrentScreen("btc")}
                >
                  BTC
                </p>
                <p
                  className={`rounded rounded-b-none py-2 px-4 cursor-pointer ${
                    currentScreen === "eth"
                      ? " border-2 border-slate-600 text-white"
                      : ""
                  }`}
                  onClick={() => setCurrentScreen("eth")}
                >
                  ETH
                </p>
                <p
                  className={`rounded rounded-b-none py-2 px-4 cursor-pointer ${
                    currentScreen === "usdt"
                      ? " border-2 border-slate-600 text-white"
                      : ""
                  }`}
                  onClick={() => setCurrentScreen("usdt")}
                >
                  USDT
                </p>
              </nav>
            </div>
            {currentScreen === "btc" && <WithdrawBTC />}
            {currentScreen === "eth" && <WithdrawETH />}
            {currentScreen === "usdt" && <WithdrawUSDT />}
          </div>
        </div>
      </section>
      <div></div>
    </div>
  );
};

export default Withdrawal;
