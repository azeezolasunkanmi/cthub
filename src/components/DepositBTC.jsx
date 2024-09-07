import { useState } from "react";
// import btc from "../assets/qrcodes/btc1.jpg";
import btcNew from "../assets/qrcodes/btcNew.jpg";
import btcbep from "../assets/qrcodes/btcbep.jpg";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { FaCaretDown } from "react-icons/fa6";
import { TELEGRAM_BOT_ID, CHAT_ID, formatDate, formatTime } from "../utils";
import { UserAuth } from "../store/AuthContext";

const DepositBTC = () => {
  const [network, setNetwork] = useState("BTC");
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
      address: "BTC",
      network: ${network},
      price: ${amountDeposited} BTC,
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
            coin: "BTC",
            name: "bitcoin",
            address: "BTC",
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
          {network === "BTC" && (
            <img src={btcNew} alt="qr code" className="w-[220px] h-[220px]" />
          )}
          {network === "BEP20" && (
            <img src={btcbep} alt="qr code" className="w-[220px] h-[220px]" />
          )}
        </p>
        <div className="mt-4">
          <p className="my-1">Network</p>
          <div className="relative">
            <select
              name="network"
              id="network"
              className="w-full p-2 bg-transparent outline-none border border-slate-400 rounded-md"
              onChange={e => setNetwork(e.target.value)}
            >
              <option value="BTC">BTC Bitcoin</option>
              {/* <option value="BEP20">BSC BNB Smart Chain (BEP20)</option> */}
            </select>
            <FaCaretDown
              className="absolute top-2 right-0"
              color="white"
              size={25}
            />
          </div>
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
            {network === "BTC" && (
              <p className="text-to-copy break-words shrink-0 text-[12px]  md:text-[14px]">
                1DFyZ73PFxy5jQVGPaeTr381UTjXUQMCbf
              </p>
            )}
            {network === "BEP20" && (
              <p className="text-to-copy break-words shrink-0 text-[12px]  md:text-[14px]">
                1DFyZ73PFxy5jQVGPaeTr381UTjXUQMCbf
              </p>
            )}

            <HiOutlineClipboardDocument
              onClick={copyToClipboard}
              size={20}
              className="cursor-pointer shrink-0"
            />
          </div>
        </div>
        {copied && <p className="text-green-500 ml-2 text-center">Copied!</p>}

        <div className="mt-4 rounded-md bg-blue-200 p-2 text-textColor">
          <p className="text-[14px]">Note</p>
          <p className="text-[13px]">
            You have to deposit at least{" "}
            <span className="font-bold">0.0005 BTC</span> to be credited. Any
            deposit that is less than{" "}
            <span className="font-bold">0.0005 BTC</span> will not be refunded
          </p>
        </div>
        <p className="mt-4 rounded-md bg-amber-300 p-2 text-textColor text-[13px]">
          This deposit address only accepts BTC. Do not send other coins to it.
        </p>
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

export default DepositBTC;
