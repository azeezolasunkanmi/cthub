import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import RootLayout from "./pages/RootLayout";
import Market from "./pages/Market";
import Blog from "./pages/Blog";
import Trade from "./pages/Trade";
import AboutUs from "./pages/AboutUs";
import CryptoDetail from "./pages/CryptoDetail";

import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import Withdrawal from "./pages/Withdrawal";
import CTHWay from "./pages/CTHWay";
import Admin from "./pages/Admin";
import ProfilePage from "./pages/ProfilePage";

import { UserAuth } from "./store/AuthContext";
import Activities from "./pages/Activities";

const App = () => {
  const { isUnderMaintenance } = UserAuth();
  return (
    <BrowserRouter>
      {isUnderMaintenance ? (
        <Routes>
          <Route path="*" element={<Admin />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Homepage />} />
            <Route path="market" element={<Market />} />
            <Route path="trade" element={<Trade />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="coin/:id" element={<CryptoDetail />} />
            <Route path="blog" element={<Blog />} />
            <Route path="cth-way" element={<CTHWay />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/withdraw"
              element={
                <ProtectedRoute>
                  <Withdrawal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/deposit"
              element={
                <ProtectedRoute>
                  <Deposit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/activity"
              element={
                <ProtectedRoute>
                  <Activities />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
