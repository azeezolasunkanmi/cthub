import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Loader from "./Loader";

const CoinDetails = () => {
  const { id } = useParams();
  const { response } = useAxios(
    `coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&sparkline=false`
  );

  if (!response) {
    return (
      <div className="flex justify-center items-center gap-2 mt-4">
        <Loader />
        <Loader />
        <Loader />
      </div>
    );
  }

  return (
    <div className="my-6">
      <div className="flex gap-2 items-center">
        <img src={response.image.small} alt={response.name} />
        <h1 className="text-2xl mb-2 capitalize font-bold">{response.name}</h1>
      </div>
      <p
        className="mt-6 text-gray-500 [&>a]:text-blue-600 [&>a]:underline"
        dangerouslySetInnerHTML={{ __html: response.description.en }}
      ></p>
    </div>
  );
};

export default CoinDetails;
