import Faq from "../components/Faq";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Trending from "../components/Trending";
import TradeBenefits from "../components/TradeBenefits";
import TradeStats from "../components/TradeStats";

const Homepage = () => {
  return (
    <div>
      <section>
        <Hero />
        <HowItWorks />
        <TradeBenefits />
        <TradeStats />
        <Trending />
        <Faq />
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Homepage;
