import bg from "../assets/bg/footer.jpg";
import logo from "../assets/logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaLinkedin,
  FaDiscord,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";

const Footer = () => {
  return (
    <div
      className="bg-no-repeat bg-cover bg-center z-0 relative pt-20"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* <div className="absolute inset-0 bg-gray-900 opacity-10 z-0"></div> */}
      <div className="mx-4 text-[#848e9c] md:flex justify-between flex-wrap pb-10 border-b lg:mx-10 xl:mx-20">
        <div className="text-center mt-4 md:mt-0 md:text-start flex flex-col gap-2">
          <h2 className="text-[18px] text-[#fff] font-medium mb-2">Company</h2>
          <p className="cursor-pointer hover:text-[#fff]">About CTH</p>
          <p className="cursor-pointer hover:text-[#fff]">Blog</p>
          <p className="cursor-pointer hover:text-[#fff]">Careers</p>
          <p className="cursor-pointer hover:text-[#fff]">Announcements</p>
          <p className="cursor-pointer hover:text-[#fff]">Licenses</p>
          <p className="cursor-pointer hover:text-[#fff]">Terms of Use</p>
          <p className="cursor-pointer hover:text-[#fff]">Privacy Policy</p>
          <p className="cursor-pointer hover:text-[#fff]">Cookie Policy</p>
        </div>
        <div className="text-center mt-4 md:mt-0 md:text-start flex flex-col gap-2">
          <h2 className="text-[18px] text-[#fff] font-medium mb-2">Services</h2>
          <p className="cursor-pointer hover:text-[#fff]">Convert</p>
          <p className="cursor-pointer hover:text-[#fff]">Spot Trading</p>
          <p className="cursor-pointer hover:text-[#fff]">Staking</p>
          <p className="cursor-pointer hover:text-[#fff]">Pay</p>
        </div>
        <div className="text-center mt-4 md:mt-0 md:text-start flex flex-col gap-2">
          <h2 className="text-[18px] text-[#fff] font-medium mb-2">Support</h2>
          <p className="cursor-pointer hover:text-[#fff]">Help Center</p>
          <p className="cursor-pointer hover:text-[#fff]">Trading Rules</p>
          <p className="cursor-pointer hover:text-[#fff]">Fees</p>
          <p className="cursor-pointer hover:text-[#fff]">Online support</p>
          <p className="cursor-pointer hover:text-[#fff]">Feedback</p>
        </div>
        <div className="text-center mt-4 md:mt-0 md:text-start flex flex-col gap-2">
          <h2 className="text-[18px] text-[#fff] font-medium mb-2">Learn</h2>
          <p className="cursor-pointer hover:text-[#fff]">Crypto Prices</p>
          <p className="cursor-pointer hover:text-[#fff]">Crypto Education</p>
          <p className="cursor-pointer hover:text-[#fff]">
            Crypto For Beginners
          </p>
          <p className="cursor-pointer hover:text-[#fff]">
            What is a Blockchain?
          </p>
          <p className="cursor-pointer hover:text-[#fff]">What is Ethereum?</p>
          <p className="cursor-pointer hover:text-[#fff]">What is Bitcoin?</p>
          <p className="cursor-pointer hover:text-[#fff]">
            Crypto Staking Explained
          </p>
          <p className="cursor-pointer hover:text-[#fff]">
            Crypto Tokens vs. Coins
          </p>
        </div>
        <div className="text-center md:text-start flex flex-col gap-8 mt-8 lg:mt-0">
          <h2>
            <img src={logo} alt="logo" className="w-[32px]" />
          </h2>
          <p className="flex gap-4 justify-center md:justify-start">
            <FaFacebookF
              size={20}
              className="cursor-pointer hover:text-white"
            />{" "}
            <FaXTwitter size={20} className="cursor-pointer hover:text-white" />{" "}
            <FaDiscord size={20} className="cursor-pointer hover:text-white" />
            <FaLinkedin
              size={20}
              className="cursor-pointer hover:text-white"
            />{" "}
            <FaInstagram
              size={20}
              className="cursor-pointer hover:text-white"
            />{" "}
            <FaTelegramPlane
              size={20}
              className="cursor-pointer hover:text-white"
            />
          </p>
          <p>
            <label
              htmlFor="newsletter"
              className="flex items-center justify-between bg-white p-1 rounded pl-2"
            >
              <input
                type="text"
                id="newsletter"
                placeholder="Enter your email"
                className=" outline-none"
              />
              <span className="flex items-center gap-1 bg-secondary p-2 rounded text-textColor">
                Subscribe <IoIosSend />
              </span>
            </label>
          </p>
        </div>
      </div>
      <p className="text-[#848e9c] mx-4 md:mx-20 py-6 text-[14px]">
        CTH © 2024 BAM Trading Services Inc. d.b.a.CTH.US - All rights
        reserved.NMLS ID: 1906829
      </p>
    </div>
  );
};

export default Footer;
