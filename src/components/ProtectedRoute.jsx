import { Navigate } from "react-router-dom";
import { UserAuth } from "../store/AuthContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();
  if (user) {
    return children;
  } else {
    console.log("erooor");
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
