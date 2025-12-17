import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthData } from "./useAuthData";

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = "/sign-in",
}) => {
  const { isAuthenticated, isChecking } = useAuthData();

  if (isChecking) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
