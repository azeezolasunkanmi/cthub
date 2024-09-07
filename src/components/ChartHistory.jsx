import { useParams } from "react-router-dom";
import moment from "moment";
import useAxios from "../hooks/useAxios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Loader from "./Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const ChartHistory = () => {
  const { id } = useParams();
  const { response } = useAxios(
    `coins/${id}/market_chart?vs_currency=usd&days=7`
  );
  if (!response) {
    return (
      <div className="flex justify-center items-center gap-2 mb-4">
        <Loader />
        <Loader />
        <Loader />
      </div>
    );
  }

  const coinChartData = response.prices.map(value => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  const options = {
    responsive: true,
  };
  const data = {
    labels: coinChartData.map(value => moment(value.x).format("MMM DD")),
    datasets: [
      {
        fill: true,
        label: id,
        data: coinChartData.map(val => val.y),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      <h2 className="text-[24px] text-textColor font-semibold mb-10 md:text-[48px]">
        {id} Chart History
      </h2>
      <Line options={options} data={data} />
    </div>
  );
};

export default ChartHistory;
