import ChartHistory from "../components/ChartHistory";
import CoinDetails from "../components/CoinDetails";
import Footer from "../components/Footer";

const CryptoDetail = () => {
  return (
    <div className="">
      <section className="mx-4 my-6">
        <div className="lg:p-32 mx-auto lg:pb-0">
          <ChartHistory />
        </div>
        <div className="lg:p-32 mx-auto lg:pt-0">
          <CoinDetails />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CryptoDetail;
