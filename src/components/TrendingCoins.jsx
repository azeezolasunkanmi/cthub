import PropTypes from "prop-types";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

const TrendingCoins = ({ coin }) => {
  return (
    <div className="w-[250px] h-[270px] bg-[#f5f6f6] text-center flex flex-col items-center gap-4 mx-4 p-6 rounded-2xl font-poppins shrink-0 box-shadow slide-in-bottom">
      <span>
        <img src={coin.small} className="rounded-md" alt={coin.name} />
      </span>
      <div>
        <h2 className=" text-[16px] text-[#171f2c] font-semibold">
          {coin.name}
        </h2>
        <p className="mt-1 text-[14px] text-[#767676] font-medium">
          {coin.symbol}
        </p>
      </div>
      <p className="text-[16px] text-[#171f2c] font-semibold">
        {coin.data.price}
      </p>
      <p
        className={`flex gap-2 items-center ${
          coin.data.price_change_percentage_24h.usd < 0
            ? "text-red-400"
            : "text-green-400"
        }`}
      >
        {coin.data.price_change_percentage_24h.usd < 0 ? (
          <FaArrowTrendDown size={20} />
        ) : (
          <FaArrowTrendUp size={20} />
        )}
        {coin.data.price_change_percentage_24h.usd}
      </p>
    </div>
  );
};

TrendingCoins.propTypes = {
  coin: PropTypes.object.isRequired,
};

export default TrendingCoins;
