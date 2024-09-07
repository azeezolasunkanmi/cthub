import { IoIosArrowBack } from "react-icons/io";
import DepositBTC from "../components/DepositBTC";
import DepositUSDT from "../components/DepositUSDT";
import DepositETH from "../components/DepositETH";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import pick1 from "../assets/pick-1.png";
import pick2 from "../assets/pick-2.png";
import pick3 from "../assets/pick-3.png";

const Deposit = () => {
  const [currentScreen, setCurrentScreen] = useState("btc");
  const navigate = useNavigate();
  return (
    <div className="min-h-[91vh] bg-textColor text-[#848e9c] p-4 md:p-10 font-poppins">
      <div
        className="flex gap-3 items-center cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <IoIosArrowBack color="white" size={20} />
        <h2 className="text-[24px] font-semibold text-white">Deposit</h2>
      </div>
      <section className="my-10">
        <div className="md:flex justify-center gap-10 items-center">
          <div className="relative mt-4 mx-auto md:mx-0 w-[250px] h-[230px] box-shadow bg-slate-800 flex justify-center gap-4 flex-col items-center">
            <span className="absolute right-4 top-1 text-[54px]">1</span>
            <img src={pick1} alt="icon" className="w-[80px]" />
            <h2 className="text-center w-[80%]">
              Select the digital currency you want to deposit
            </h2>
          </div>
          <div className="relative mt-4 mx-auto md:mx-0 w-[250px] h-[230px] box-shadow bg-slate-800 flex justify-center gap-4 flex-col items-center">
            <span className="absolute right-4 top-1 text-[54px]">2</span>
            <img src={pick2} alt="icon" className="w-[80px]" />

            <h2 className="text-center w-[80%]">
              Copy your wallet address or scan the Qr code and make your deposit
            </h2>
          </div>
          <div className="relative mt-4 mx-auto md:mx-0 w-[250px] h-[230px] box-shadow bg-slate-800 flex justify-center gap-4 flex-col items-center">
            <span className="absolute right-4 top-1 text-[54px]">3</span>
            <img src={pick3} alt="icon" className="w-[80px]" />
            <h2 className="text-center w-[80%]">
              Wait for a confirmation message from the network
            </h2>
          </div>
        </div>
        <div className="mt-20">
          <div className="border border-slate-600 rounded-md mx-auto max-w-[500px] box-shadow">
            <div className="p-4">
              <h3 className="text-center my-6">
                Please select the currency you want to deposit
              </h3>
              <nav className="flex justify-center gap-6 border-b-2 border-slate-600">
                <p
                  className={`rounded rounded-b-none py-2 px-4 cursor-pointer ${
                    currentScreen === "btc"
                      ? "text-white border-2 border-slate-600"
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
            {currentScreen === "btc" && <DepositBTC />}
            {currentScreen === "eth" && <DepositETH />}
            {currentScreen === "usdt" && <DepositUSDT />}
          </div>
        </div>
      </section>
      <div></div>
    </div>
  );
};

export default Deposit;
