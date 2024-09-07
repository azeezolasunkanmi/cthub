import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const RootLayout = () => {
  return (
    <div className="w-full">
      <div>
        <MainNavigation />
        <div className="pt-[47px] md:pt-[48px] lg:pt-[56px]"></div>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
