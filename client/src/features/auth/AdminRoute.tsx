import { Navigate, useLocation } from "react-router-dom";
import { useAuthData } from "./useAuthData";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { role } = useAuthData(); 
  const location = useLocation();


  if (role !== "admin") {
    // replace: true sprawia, że użytkownik nie wróci tutaj przyciskiem "wstecz"
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
