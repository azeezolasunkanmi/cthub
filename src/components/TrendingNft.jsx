import PropTypes from "prop-types";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

const TrendingNft = ({ nft }) => {
  //   console.log(nft);
  return (
    <div className="w-[250px] h-[270px] bg-[#f5f6f6] text-center flex flex-col items-center gap-4 mx-4 p-6 rounded-2xl font-poppins shrink-0 box-shadow slide-in-bottom">
      <span>
        <img src={nft.thumb} className="rounded-md" alt={nft.name} />
      </span>
      <div>
        <h2 className=" text-[16px] text-[#171f2c] font-semibold">
          {nft.name}
        </h2>
        <p className="mt-1 text-[14px] text-[#767676] font-medium">
          {nft.symbol}
        </p>
      </div>
      <p className="text-[16px] text-[#171f2c] font-semibold">
        {nft.data.floor_price}
      </p>
      <p
        className={`flex gap-2 items-center ${
          nft.floor_price_24h_percentage_change < 0
            ? "text-red-400"
            : "text-green-400"
        }`}
      >
        {nft.floor_price_24h_percentage_change < 0 ? (
          <FaArrowTrendDown />
        ) : (
          <FaArrowTrendUp />
        )}
        {nft.floor_price_24h_percentage_change}
      </p>
    </div>
  );
};

TrendingNft.propTypes = {
  nft: PropTypes.object.isRequired,
};
export default TrendingNft;
