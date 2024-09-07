import { Link, NavLink, useNavigate } from "react-router-dom";
import { navLinks } from "../constants";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { UserAuth } from "../store/AuthContext";
import { CgProfile } from "react-icons/cg";
import { IoIosSettings, IoIosInformationCircleOutline } from "react-icons/io";
import { IoChatboxOutline } from "react-icons/io5";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { currencyFormat } from "../utils";
import { FiRefreshCcw } from "react-icons/fi";
import logo from "../assets/logo.png";

const MainNavigation = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [profileToggle, setProfileToggle] = useState(false);
  const { logout, setUser, user, presentUser, updatePrices } = UserAuth();

  const logoutHandler = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/");
    } catch (e) {
      console.log(e);
    }

    setProfileToggle(!profileToggle);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full text-white bg-[#131212] py-2 font-poppins z-50">
        <div className="flex justify-between items-center px-4 lg:px-10 xl:px-20">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <img src={logo} alt="logo" className="w-[32px]" />
          </div>
          <div className="hidden lg:flex items-center text-[16px] font-semibold lg:gap-6 xl:gap-10">
            {navLinks.map(link => (
              <NavLink
                key={link.id}
                to={link.to}
                className="p-2 hover:border border-slate-600 rounded"
              >
                {link.title}
              </NavLink>
            ))}
          </div>
          {/* USER PANEL */}
          <div className="flex gap-4 items-center">
            {user ? (
              <div className="cursor-pointer relative flex gap-4 items-center">
                <div onClick={() => setProfileToggle(!profileToggle)}>
                  <CgProfile size={30} />
                </div>
                <h2 className="capitalize">{user.displayName}</h2>
                {profileToggle && (
                  <div className="absolute top-10 right-0 border w-[200px] bg-textColor text-white px-4 py-2 text-[14px] z-20">
                    <h3 className="py-1 border-b border-slate-600 text-[#848e9c] capitalize">
                      {user.displayName}
                    </h3>
                    <div className="pt-1 text-[12px] text-[#848e9c]">
                      <p>Account value</p>
                    </div>
                    <div
                      className="pb-1 border-b border-slate-600 flex gap-8 items-center"
                      onClick={updatePrices}
                    >
                      <h2 className=" text-[18px]">
                        {presentUser &&
                          currencyFormat(presentUser?.totalBalance)}
                      </h2>
                      <FiRefreshCcw
                        size={16}
                        className="cursor-pointer text-[#848e9c]"
                      />
                    </div>
                    <div
                      className="flex gap-2 items-center py-2 hover:opacity-50 cursor-pointer"
                      onClick={() => {
                        navigate("/dashboard");
                        setProfileToggle(!profileToggle);
                      }}
                    >
                      <CgProfile />
                      <p>Dashboard</p>
                    </div>
                    <div
                      className="flex gap-2 items-center py-2 hover:opacity-50 cursor-pointer"
                      onClick={() => {
                        navigate("/dashboard/deposit");
                        setProfileToggle(!profileToggle);
                      }}
                    >
                      <IoIosSettings />
                      <p>Deposit</p>
                    </div>
                    <div
                      className="flex gap-2 items-center py-2 hover:opacity-50 cursor-pointer"
                      onClick={() => {
                        navigate("/dashboard/withdraw");
                        setProfileToggle(!profileToggle);
                      }}
                    >
                      <IoIosInformationCircleOutline />
                      <p>Withdraw</p>
                    </div>
                    <div
                      className="flex gap-2 items-center py-2 hover:opacity-50 cursor-pointer"
                      onClick={() => {
                        navigate("/trade");
                        setProfileToggle(!profileToggle);
                      }}
                    >
                      <MdOutlineFormatListBulleted />
                      <p>Trade</p>
                    </div>
                    <div
                      className="flex gap-2 items-center py-2 hover:opacity-50 cursor-pointer"
                      onClick={() => {
                        navigate("/dashboard/profile");
                        setProfileToggle(!profileToggle);
                      }}
                    >
                      <CgProfile />
                      <p>Profile</p>
                    </div>
                    <div
                      className="flex gap-2 items-center py-2  hover:opacity-50 cursor-pointer border-b border-slate-600"
                      onClick={() => {
                        navigate("/dashboard/activity");
                        setProfileToggle(!profileToggle);
                      }}
                    >
                      <IoChatboxOutline />
                      <p>Activity</p>
                    </div>
                    <div
                      onClick={logoutHandler}
                      className="py-4  hover:opacity-50"
                    >
                      <p>Log out</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex gap-4 items-center">
                <Link
                  to="/login"
                  className="px-6 py-2 bg-[#ff9800] rounded-md font-medium"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 bg-orange-600 rounded-md font-medium"
                >
                  Register
                </Link>
              </div>
            )}

            {!toggle && (
              <RxHamburgerMenu
                size={30}
                className="lg:hidden"
                onClick={() => setToggle(!toggle)}
              />
            )}
            {toggle && (
              <MdClose
                size={30}
                className="lg:hidden"
                onClick={() => setToggle(!toggle)}
              />
            )}
          </div>
        </div>
      </div>

      {/* DROPDOWN MENU  */}
      {toggle && (
        <div
          className="fixed top-[55px] left-0 w-full z-50 py-2 font-poppins bg-white text-textColor"
          onClick={() => setToggle(!toggle)}
        >
          <div className="flex flex-col items-start m-4 gap-6 text-[16px] font-semibold lg:hidden">
            {navLinks.map(link => (
              <span
                key={link.id}
                className="w-full p-2 font-bold text-textColor hover:font-medium"
              >
                <NavLink to={link.to}>{link.title}</NavLink>
              </span>
            ))}
            {!user && (
              <div className="flex gap-4 items-center">
                <Link
                  to="login"
                  className="px-6 py-2 bg-[#ff9800] rounded-md font-medium hover:bg-orange-500"
                >
                  Log in
                </Link>
                <Link
                  to="signup"
                  className="px-6 py-2 bg-orange-600 rounded-md font-medium hover:bg-orange-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MainNavigation;
