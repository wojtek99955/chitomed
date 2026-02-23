import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRedirectWhenLogged = (redirectPath: string = "/dashboard") => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate(redirectPath, { replace: true });
    }
  }, [navigate, redirectPath]);
};

export default useRedirectWhenLogged;
