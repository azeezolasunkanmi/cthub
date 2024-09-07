import MarketTab from "../components/MarketTab";
import { CiSearch } from "react-icons/ci";
import useAxios from "../hooks/useAxios";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const Market = () => {
  const { response, loading } = useAxios(
    "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center gap-2 mt-20">
        <Loader />
        <Loader />
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="font-poppins px-4 mt-10 lg:px-10 xl:px-36 lg:mt-20 pb-20">
        <h1 className="text-[36px] font-semibold mb-6 lg:mb-11">
          Cryptocurrency Market
        </h1>
        <section>
          <div className="flex items-center border-b text-[#667cc9] text-[14px]">
            <span className="md:w-[30%] py-3">
              <label htmlFor="currency" className=" flex gap-6 items-center">
                <CiSearch size={20} />
                <input
                  id="currency"
                  type="text"
                  placeholder="currency"
                  className="outline-none"
                />
              </label>
            </span>
            <span className="hidden md:block md:w-[17%] py-3">
              <p>Price</p>
            </span>
            <span className="hidden md:block md:w-[17%] py-3">
              <p>24h Change</p>
            </span>
            <span className="hidden md:block md:w-[26%] py-3">
              <p>Market Cap</p>
            </span>
            <span className="hidden md:block md:w-[1o%] py-3">
              <p>Learn</p>
            </span>
          </div>
          {response &&
            response.map(coin => <MarketTab key={coin.id} coin={coin} />)}
        </section>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Market;
