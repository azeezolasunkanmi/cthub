import { UserAuth } from "../store/AuthContext";
import PortfolioRow from "./PortfolioRow";

const TradeViewAssets = () => {
  const { presentUser } = UserAuth();

  return (
    <div className="px-2">
      {presentUser?.assets.map((data, i) => (
        <PortfolioRow key={i} asset={data} />
      ))}
    </div>
  );
};

export default TradeViewAssets;
