import { useState } from "react";
import etherc20 from "../assets/qrcodes/etherc20.jpg";
import ethbep20 from "../assets/qrcodes/ethbep20.jpg";
import { HiOutlineClipboardDocument } from "react-icons/hi2";

import { TELEGRAM_BOT_ID, CHAT_ID, formatDate, formatTime } from "../utils";
import { UserAuth } from "../store/AuthContext";

const DepositETH = () => {
  const [network, setNetwork] = useState("ERC20");
  const [copied, setCopied] = useState(false);
  const [amountDeposited, setAmountDeposited] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState("");
  const { presentUser, updateUser, getCurrentUser } = UserAuth();
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  const formattedTime = formatTime(currentDate);

  const copyToClipboard = () => {
    const textToCopy = document.querySelector(".text-to-copy");
    navigator.clipboard.writeText(textToCopy.innerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // Reset copied state after 1.5 seconds
  };

  const sender = async () => {
    const message = `
      DEPOSIT
      address: "ETH",
      network: ${network},
      price: ${amountDeposited} ETH,
      useremail: ${presentUser.email},
      date: ${formattedDate},
      time: ${formattedTime}
    `;
    const telegram_bot_id = TELEGRAM_BOT_ID;
    const chat_id = CHAT_ID;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${telegram_bot_id}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
          },
          body: JSON.stringify({
            chat_id: chat_id,
            text: message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = e => {
    e.preventDefault();

    if (amountDeposited !== "" && amountDeposited >= 1) {
      setError("");
      sender();
      updateUser(presentUser.docId, {
        activity: [
          ...presentUser.activity,
          {
            id: +presentUser.activity.length,
            type: "deposit",
            coin: "ETH",
            name: "ethereum",
            address: "ETH",
            network: network,
            quantity: +amountDeposited,
            date: formattedDate,
            time: formattedTime,
            pending: true,
            status: "pending",
            processed: false,
          },
        ],
      });
      getCurrentUser();
      setIsSubmit(true);
      setAmountDeposited("");
      setTimeout(() => {
        setIsSubmit(false);
      }, 4000);
    } else {
      setErrorMsg();
      console.log("Form has errors, please correct them.");
    }
  };

  const setErrorMsg = () => {
    setError("Enter the amount you deposited");
    setTimeout(() => {
      setError("");
    }, 4000);
  };

  return (
    <div>
      <div className="p-4 font-poppins">
        {isSubmit && (
          <p className="bg-green-500 text-center my-6 p-2 text-textColor mx-6 rounded-md">
            Deposit pending, Check activity page for progress 🙂
          </p>
        )}
        <p className="flex justify-center items-center">
          {network === "ERC20" && (
            <img src={etherc20} alt="qr code" className="w-[220px] h-[220px]" />
          )}
          {network === "BEP20" && (
            <img src={ethbep20} alt="qr code" className="w-[220px] h-[220px]" />
          )}
        </p>
        <div className="mt-4">
          <p className="my-1">Network</p>
          <select
            name="network"
            id="network"
            className="w-full p-2 bg-transparent outline-none border border-slate-400 rounded-md"
            onChange={e => setNetwork(e.target.value)}
          >
            <option value="ERC20">ETH Ethereum (ERC20)</option>
            <option value="BEP20">BSC BNB Smart Chain (BEP20)</option>
          </select>
        </div>
        <div className="mt-4">
          <div className="flex flex-col gap-2">
            <label>Amount ($)</label>
            <input
              className="p-2 bg-transparent outline-none rounded-md  border border-slate-400"
              type="text"
              value={amountDeposited}
              onChange={e => setAmountDeposited(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-[14px]">{error}</p>}
        </div>
        <div className="mt-4">
          <p className="my-1">Deposit address</p>
          <div className="p-2 border-2 border-slate-400 rounded-md flex gap-4 justify-between items-center">
            {network === "ERC20" && (
              <p className="text-to-copy break-words shrink-0 text-[12px]  md:text-[14px]">
                0x5b78d4F6241b3A3749F334D91477C6953Ae29E23
              </p>
            )}
            {network === "BEP20" && (
              <p className="text-to-copy break-words shrink-0 text-[12px]  md:text-[14px]">
                0x333e2F46E5129ed759149a4339BCddCD223f23E8
              </p>
            )}
            <HiOutlineClipboardDocument
              onClick={copyToClipboard}
              size={25}
              className="cursor-pointer"
            />
          </div>
        </div>
        {copied && <p className="text-green-500 ml-2 text-center">Copied!</p>}

        <div className="mt-4 rounded-md bg-blue-200 p-2 text-textColor">
          <p className="text-[14px]">Note</p>
          <p className="text-[13px]">
            You have to deposit at least{" "}
            <span className="font-bold">0.0008 ETH</span> to be credited. Any
            deposit that is less than{" "}
            <span className="font-bold">0.0008 ETH</span> will not be refunded
          </p>
        </div>
        <div className="my-4">
          <button
            className="w-full p-2 bg-green-500 rounded-md text-textColor"
            onClick={submitHandler}
          >
            Click here after you deposit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositETH;
