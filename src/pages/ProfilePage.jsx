import { useState } from "react";
import ProfileDetails from "../components/ProfileDetails";
import { MdClose } from "react-icons/md";

const ProfilePage = () => {
  const [finishProfileToggle, setFinishProfileToggle] = useState(true);

  return (
    <div className="bg-textColor text-[#848e9c] p-4 lg:p-10 font-poppins">
      {finishProfileToggle && (
        <div
          className={`relative p-4 bg-[#fff] text-textColor rounded mb-10 border-l-8 border-red-500`}
        >
          <h2 className="font-semibold">Finish your profile</h2>
          <p>
            By completing your profile you will have access to the full
            functunality of this website
          </p>
          <MdClose
            className="absolute right-4 top-4 cursor-pointer"
            color="black"
            size={25}
            onClick={() => setFinishProfileToggle(false)}
          />
        </div>
      )}
      <ProfileDetails />
    </div>
  );
};

export default ProfilePage;
