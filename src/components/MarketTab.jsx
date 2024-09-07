import { Link } from "react-router-dom";
import { currencyFormat } from "../utils";
import PropTypes from "prop-types";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

const MarketTab = ({ coin }) => {
  return (
    <Link to={`/coin/${coin.id}`}>
      <div className="flex justify-between border-b items-center text-[14px]">
        <span className="w-[60%] md:w-[30%] py-3 flex gap-6 items-center">
          <img src={coin.image} alt="logo" className="w-[30px] h-[30px]" />
          <div>
            <p className="flex gap-2 flex-row items-center">
              <span className="font-semibold uppercase">{coin.symbol} </span>
              <span className="text-[#667c99]">{coin.name}</span>
            </p>
            <p className="md:hidden">{currencyFormat(coin.market_cap)}</p>
          </div>
        </span>

        <span className="hidden md:block w-[17%] py-3">
          <p>{currencyFormat(coin.current_price)}</p>
        </span>
        <span
          className={`w-[20%] md:w-[17%] py-3 ${
            coin.price_change_percentage_24h < 0
              ? "text-red-400"
              : "text-green-400"
          }`}
        >
          <p className="md:hidden text-[#171f2c]">
            {currencyFormat(coin.current_price)}
          </p>
          <p className="flex items-center gap-3">
            {coin.price_change_percentage_24h < 0 ? (
              <FaArrowTrendDown size={20} className="hidden md:block" />
            ) : (
              <FaArrowTrendUp size={20} className="hidden md:block" />
            )}{" "}
            {coin.price_change_percentage_24h}
          </p>
        </span>

        <span className="hidden md:block md:w-[26%] py-3">
          <p>{currencyFormat(coin.market_cap)}</p>
        </span>
        <span className="w-[15%] md:w-[10%] py-3">
          <span
            // to="market"
            className="py-2 px-4 text-white bg-[#1bb6c1] rounded-md"
          >
            Learn
          </span>
        </span>
      </div>
    </Link>
  );
};

MarketTab.propTypes = {
  coin: PropTypes.object.isRequired,
};

export default MarketTab;
