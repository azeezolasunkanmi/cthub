import { useState } from "react";
import useAxios from "../hooks/useAxios";
import TrendingCoins from "./TrendingCoins";
import TrendingNft from "./TrendingNft";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Loader from "./Loader";

const Trending = () => {
  const [category, setCategory] = useState("coins");
  const [scrollPosition, setScrollPosition] = useState(0);
  const { response } = useAxios("search/trending");

  const handleScroll = scrollOffset => {
    const container = document.getElementById("trendingSection");
    if (container) {
      container.scrollLeft += scrollOffset;
      setScrollPosition(container.scrollLeft);
      scrollPosition;
    }
  };

  return (
    <div className="mx-4 md:mx-10 my-10 bg-[#fff] font-poppins ">
      <h2 className="text-[24px] text-textColor font-semibold mb-10 md:text-[48px]">
        Trending
      </h2>
      <div className="flex gap-8">
        <button
          className={`px-8 py-3 border border-textColor mb-8 rounded-3xl text-[16px] font-semibold ${
            category === "coins"
              ? "text-[#fff] bg-textColor"
              : "bg-white text-textColor"
          }`}
          onClick={() => setCategory("coins")}
        >
          Coins
        </button>
        <button
          className={`px-8 py-3 border border-textColor mb-8 rounded-3xl text-[16px]  font-semibold ${
            category === "nfts"
              ? "text-[#fff] bg-textColor"
              : "bg-white text-textColor"
          }`}
          onClick={() => setCategory("nfts")}
        >
          Nfts
        </button>
      </div>
      <div className="relative">
        <span
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full cursor-pointer z-10"
          onClick={() => handleScroll(-300)}
        >
          <FaAngleLeft size={30} />
        </span>
        <span
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full cursor-pointer z-10"
          onClick={() => handleScroll(300)}
        >
          <FaAngleRight size={30} />
        </span>
        <section
          id="trendingSection"
          className="flex gap-4 py-8 overflow-x-auto scrollbar-hide overflow-y-hidden"
        >
          {!response && (
            <div className="flex justify-center items-center gap-2 w-full">
              <Loader />
              <Loader />
              <Loader />
            </div>
          )}
          {response &&
            category === "coins" &&
            response.coins.map(coin => (
              <TrendingCoins key={coin.item.coin_id} coin={coin.item} />
            ))}

          {response &&
            category === "nfts" &&
            response.nfts.map(nft => <TrendingNft key={nft.id} nft={nft} />)}
        </section>
      </div>
    </div>
  );
};

export default Trending;
