import { Navigate, useLocation } from "react-router-dom";
import { authService } from "../services/authService";

function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!authService.isLoggedIn()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;
