import { RiAccountCircleLine } from "react-icons/ri";
import { MdPayments } from "react-icons/md";
import { MdVerifiedUser } from "react-icons/md";
import { FaHourglassStart } from "react-icons/fa";
import { Link } from "react-router-dom";
import bg from "../assets/bg/bg-coin.png";

const HowItWorks = () => {
  return (
    <div className="bg-[#f5f6f6] font-poppins py-20 relative">
      <img
        src={bg}
        alt="background"
        className="absolute right-0 bottom-0 z-0"
      />
      <div>
        <h2 className="text-center text-[32px] text-[#171f2c] mb-5">
          HOW IT WORK
        </h2>
        <div className="w-[80px] h-[4px] bg-[#ff9800] mx-auto"></div>
        <p className="text-center max-w-[800px] mx-auto pt-3 text-[14px] text-[#767676] font-normal px-4">
          Our comprehensive cybersecurity platform, driven by artificial
          intelligence, not only safeguards your organization but also educates
          your workforce.
        </p>
      </div>
      <div className="flex justify-center items-center flex-wrap gap-4 max-w-[1100px] mx-auto mt-20">
        <div className="flex flex-col items-center gap-4 justify-center bg-[#171f2c] w-[250px] px-[10px] py-[30px] text-center text-[#fff] h-[280px] transition-transform duration-300 transform hover:scale-105">
          <span className="flex justify-center">
            <RiAccountCircleLine size={50} color="green" />
          </span>
          <h2 className="text-[18px] text-[#fff] uppercase font-medium mt-4">
            Create account
          </h2>
          <Link to="/signup" className="border rounded-sm px-4 py-2">
            Start Now
          </Link>
        </div>
        <div className="flex flex-col items-center gap-4 justify-center bg-[#fff] w-[250px] px-[10px] py-[30px] text-center text-[#767676] h-[260px] box-shadow transition-transform duration-300 transform hover:scale-105">
          <span className="flex justify-center">
            <MdVerifiedUser size={50} color="blue" />
          </span>
          <h2 className="text-[18px] text-[#171f2c] uppercase font-medium mt-4">
            Verify your account
          </h2>
        </div>
        <div className="flex flex-col items-center gap-4 justify-center bg-[#fff] w-[250px] px-[10px] py-[30px] text-center text-[#767676] h-[260px] box-shadow transition-transform duration-300 transform hover:scale-105">
          <span className="flex justify-center">
            <MdPayments size={50} color="purple" />
          </span>
          <h2 className="text-[18px] text-[#171f2c] uppercase font-medium mt-4">
            Deposit crypto
          </h2>
        </div>
        <div className="flex flex-col items-center gap-4 justify-center bg-[#fff] w-[250px] px-[10px] py-[30px] text-center text-[#767676] h-[260px] box-shadow transition-transform duration-300 transform hover:scale-105">
          <span className="flex justify-center">
            <FaHourglassStart size={50} color="orange" />
          </span>
          <h2 className="text-[18px] text-[#171f2c] uppercase font-medium mt-4">
            Start your journey
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
