import { FaDownLeftAndUpRightToCenter } from "react-icons/fa6";
import PropTypes from "prop-types";

const ActivityRow = ({ activity }) => {
  return (
    <div className="p-4">
      <div className="hidden md:flex items-center gap-10 w-full border-b border-slate-500 pb-2">
        <p className="w-[3%]">
          <FaDownLeftAndUpRightToCenter
            color={activity?.type === "deposit" ? "green" : "red"}
          />
        </p>
        <p className="w-[5%]">{activity.coin}</p>
        <p className="w-[15%]">{activity.date}</p>
        <p className="w-[15%]">{activity.time}</p>
        <p className="w-[20%]">
          {activity?.quantity?.toFixed(4)} {activity.coin}
        </p>
        <p
          className={`${
            activity.status === "Completed"
              ? "text-green-500"
              : "text-orange-500"
          } w-[10%]`}
        >
          {activity.status}
        </p>
      </div>
      {/* MOBILE */}
      <div className="flex items-center gap-2 border-b border-slate-500 pb-2 md:hidden">
        <p className="w-[10%]">
          <FaDownLeftAndUpRightToCenter color="green" />
        </p>
        <p className="w-[30%]">
          {activity?.quantity?.toFixed(4)} {activity.coin}
        </p>
        <div className="w-[30%]">
          <p className="">{activity.date}</p>
          <p className="">{activity.time}</p>
        </div>
        <p
          className={`w-[20%] capitalize ${
            activity.status === "Completed"
              ? "text-green-500"
              : "text-orange-500"
          }`}
        >
          {activity.status}
        </p>
      </div>
    </div>
  );
};

ActivityRow.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    pending: PropTypes.bool.isRequired,
    processed: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    coin: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    network: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default ActivityRow;
