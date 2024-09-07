import trade1 from "../assets/trade1.jpg";
import trade2 from "../assets/cryptoimage.jpg";
import { GiPentarrowsTornado } from "react-icons/gi";
import { GrShieldSecurity } from "react-icons/gr";

const TradeStats = () => {
  return (
    <div className=" text-textColor">
      <div className="text-center mt-20 px-4">
        <h2 className="text-[28px] md:text-[34px] font-medium">
          Trade with confidence
        </h2>
        <p className="text-[18px] md:max-w-[580px] mx-auto">
          The numbers speak for themselves. Trade with the support of the
          world’s largest retail broker.
        </p>
      </div>
      <div className="p-[8%] text-textColor">
        <div className="md:flex justify-center gap-10 mb-20">
          <div className="md:w-1/2">
            <img className="rounded-2xl" src={trade1} alt="" />
          </div>
          <div className="md:w-1/2 my-auto text-center md:text-start pt-4">
            <p className="flex justify-center md:block">
              <GiPentarrowsTornado size={90} />
            </p>
            <h2 className="text-[28px] md:text-[34px] font-medium">
              Seize every opportunity
            </h2>
            <p className="text-[18px]">
              Trade online anytime, anywhere. On web, mobile and desktop.
            </p>
          </div>
        </div>
        <div className="md:flex justify-center flex-row-reverse gap-10">
          <div className="md:w-1/2">
            <img className="rounded-2xl" src={trade2} alt="" />
          </div>
          <div className="md:w-1/2 my-auto text-center md:text-start pt-4">
            <p className="flex justify-center md:block">
              <GrShieldSecurity size={90} />
            </p>
            <h2 className="text-[28px] md:text-[34px] font-medium">
              Your security is our priority
            </h2>
            <p className="text-[18px]">
              From secure payments to negative balance protection, you are
              covered from every angle.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center md:flex justify-center gap-6">
        <div className="p-4 md:border-l mb-4">
          <p className="text-[22px] font-medium">$5+ trillion</p>
          <p className="">monthly trading volume</p>
        </div>
        <div className="p-4 md:border-l mb-4">
          <p className="text-[22px] font-medium">1.9 billion</p>
          <p>trades executed in 2023</p>
        </div>
        <div className="p-4 md:border-l mb-4">
          <p className="text-[22px] font-medium">64,000+</p>
          <p>registered partners</p>
        </div>
        <div className="p-4 md:border-l mb-4">
          <p>⭐⭐⭐⭐</p>
          <p>Trustpilot rating</p>
        </div>
      </div>
    </div>
  );
};

export default TradeStats;
