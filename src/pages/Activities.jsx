import { UserAuth } from "../store/AuthContext";
import ActivityRow from "../components/ActivityRow";
import { useState } from "react";

const Activities = () => {
  const [type, setType] = useState("all");
  const { presentUser } = UserAuth();

  return (
    <div className="bg-textColor text-[#848e9c] p-4 lg:p-10 font-poppins min-h-[91vh]">
      <div className="flex gap-6 px-4">
        <button
          className={`${type === "all" ? "border-b-2" : ""}`}
          onClick={() => setType("all")}
        >
          All
        </button>
        <button
          className={`${type === "withdraw" ? "border-b-2" : ""}`}
          onClick={() => setType("withdraw")}
        >
          Withdrawal
        </button>
        <button
          className={`${type === "deposit" ? "border-b-2" : ""}`}
          onClick={() => setType("deposit")}
        >
          Deposit
        </button>
      </div>
      <section className="mt-10">
        {type === "all" &&
          presentUser.activity &&
          presentUser?.activity.length < 1 && (
            <p className="text-center">
              No activities yet... Make a Deposit to Get Started
            </p>
          )}
        {type === "all" &&
          presentUser.activity &&
          presentUser?.activity.map((act, i) => (
            <ActivityRow key={i} activity={act} />
          ))}
        {type === "withdraw" &&
          presentUser.activity &&
          presentUser?.activity.filter(act => act.type === "withdrawal")
            .length < 1 && <p className="text-center">No withdrawal yet...</p>}

        {type === "withdraw" &&
          presentUser.activity &&
          presentUser?.activity
            .filter(act => act.type === "withdrawal")
            .map((data, i) => <ActivityRow key={i} activity={data} />)}
        {type === "deposit" &&
          presentUser.activity &&
          presentUser?.activity.filter(act => act.type === "deposit").length <
            1 && (
            <p className="text-center">
              No deposit yet... Make a Deposit to Get Started
            </p>
          )}
        {type === "deposit" &&
          presentUser.activity &&
          presentUser?.activity
            .filter(act => act.type === "deposit")
            .map((data, i) => <ActivityRow key={i} activity={data} />)}
      </section>
    </div>
  );
};

export default Activities;
