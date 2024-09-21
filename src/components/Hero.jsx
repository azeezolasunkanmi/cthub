import { Link } from "react-router-dom";
import bghero from "../assets/bg/bg-1.jpg";
import earth from "../assets/earth.png";
import bitcoin from "../assets/bitcoin.png";
import { IoChevronForward } from "react-icons/io5";

const Hero = () => {
  return (
    <div
      className="bg-no-repeat bg-cover bg-center relative pt-4 mt-[38px]"
      style={{
        backgroundImage: `url(${bghero})`,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="px-4 py-8 text-[#fff] font-poppins lg:mx-10 lg:flex items-center gap-6 justify-between">
        <div className="z-10 relative xl:ml-10 lg:w-[60%]">
          {/* <div className="absolute inset-0 bg-gray-900 opacity-30"></div> */}
          <h1 className="text-[36px] text-center font-bold lg:pl-4 lg:text-start lg:leading-[70px] lg:text-[53px] lg:border-l-8 border-secondary">
            A <span className="text-secondary">Secure</span> Cryptocurrency
            Trading<span className="text-secondary"> Platform</span>
          </h1>
          <p className="mt-4 text-[18px] text-center font-medium max-w-[600px] mx-auto lg:mx-0 lg:text-start">
            Trade with the world’s largest retail broker and benefit from
            better-than-market conditions.
          </p>
          <div className="flex gap-4 items-center justify-center mt-6 lg:justify-start">
            <Link
              to="/signup"
              className="flex gap-2 items-center px-4 py-4 bg-secondary rounded-sm font-medium"
            >
              <span>Get Started</span>
              <span>
                <IoChevronForward />
              </span>
            </Link>
            <Link
              to="cth-way"
              className="flex gap-2 items-center p-4  bg-[#fff] text-[#000] rounded-sm font-medium"
            >
              <span>Explore</span>
              <span>
                <IoChevronForward />
              </span>
            </Link>
          </div>
        </div>
        <div className="hidden relative lg:block w-[40%]">
          <img
            src={bitcoin}
            alt="bitcoin"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-[200px]"
          />
          <img src={earth} alt="earth" className="rotate-center" />
        </div>
      </div>
      <div className="fixed top-[48px] lg:top-[56px] left-0 w-full z-50">
        <coingecko-coin-price-marquee-widget
          coin-ids="bitcoin,ethereum,eos,ripple,litecoin"
          currency="usd"
          background-color="#ffffff"
          locale="en"
        ></coingecko-coin-price-marquee-widget>
      </div>
    </div>
  );
};

export default Hero;
