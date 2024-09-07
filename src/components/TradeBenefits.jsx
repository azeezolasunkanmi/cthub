import trade2 from "../assets/trade2.jpg";

const TradeBenefits = () => {
  return (
    <div className="bg-[#070e20] text-[#fff] font-poppins pt-6">
      <h2 className="text-center text-[26px] md:text-[32px] my-10 md:my-20 font-semibold">
        Trade without tradeoffs
      </h2>
      <section className="md:flex justify-center gap-8">
        <div>
          <div className="md:max-w-[290px] h-full flex flex-col justify-center gap-10 px-6">
            <div className="text-center">
              <p className="text-[14px] bg-[#6c8595] rounded-lg inline-block px-2 mb-2">
                Withdrawals
              </p>
              <h4 className="text-[20px] mb-2">Instant withdrawals</h4>
              <p className="text-[16px] text-[#848e9c]">
                Get your deposits and withdrawals approved the moment you click
                the button.
              </p>
            </div>
            <div className="text-center">
              <p className="text-[14px] bg-[#6c8595] rounded-lg inline-block px-2 mb-2">
                Spreads
              </p>
              <h4 className="text-[20px] mb-2">Tight & stable spreads</h4>
              <p className="text-[16px] text-[#848e9c]">
                Trade confidently in times of volatility with low and reliable
                spreads.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="max-w-[500px] p-6 md:p-0">
            <img src={trade2} alt="phone image" />
          </div>
        </div>
        <div>
          <div className="md:max-w-[290px] h-full flex flex-col justify-center gap-10 px-6">
            <div className="text-center">
              <p className="text-[14px] bg-[#6c8595] rounded-lg inline-block px-2 mb-2">
                Execution speed
              </p>
              <h4 className="text-[20px] mb-2">Ultra-fast execution</h4>
              <p className="text-[16px] text-[#848e9c]">
                Execute your orders in milliseconds, no matter how big they are.
              </p>
            </div>
            <div className="text-center">
              <p className="text-[14px] bg-[#6c8595] rounded-lg inline-block px-2 mb-2">
                Spreads
              </p>
              <h4 className="text-[20px] mb-2">No overnight fees</h4>
              <p className="text-[16px] text-[#848e9c]">
                Hold your leveraged positions for as long as you like,
                swap-free. T&C apply.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="py-16 text-center px-6">
        <h2 className="text-[24px] md:text-[28px]">
          Trade assets from global markets
        </h2>
        <p className="text-[16px] text-[#848e9c]">
          Capitalize on every opportunity with the world’s most popular assets.
        </p>
      </div>
    </div>
  );
};

export default TradeBenefits;
