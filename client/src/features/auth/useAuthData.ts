import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { api } from "../../api/api";

interface MyJwtPayload {
  id: string;
  email: string;
  role: string;
  exp: number;
  createdAt:string;
}

interface AuthData {
  id: string | null;
  email: string | null;
  role: string | null;
  isAuthenticated: boolean;
  isChecking: boolean;
  isRefreshing: boolean;
  createdAt:string,
}

const AUTH_QUERY_KEY = ["authUser"];

const refreshToken = async () => {
  const response = await api.get("/auth/refresh");
  const newToken = response.data.accessToken;
  localStorage.setItem("token", newToken);
  return newToken;
};

export const useAuthData = (): AuthData => {

  const { data, isLoading, isFetching } = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: async () => {
      let token = localStorage.getItem("token");
      if (!token) return null;

      try {
        const decoded = jwtDecode<MyJwtPayload>(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          // Jeśli potrzebujemy odświeżyć, to jest moment "isRefreshing"
          token = await refreshToken();
        }

        return jwtDecode<MyJwtPayload>(token!);
      } catch (error) {
        localStorage.removeItem("token");
        return null;
      }
    },
  });

  // Mapujemy dane z React Query na Twój format AuthData
  if (isLoading) {
    return {
      id: null,
      email: null,
      role: null,
      isAuthenticated: false,
      isChecking: true,
      isRefreshing: false,
      createdAt:"",
    };
  }

  if (!data) {
    return {
      id: null,
      email: null,
      role: null,
      isAuthenticated: false,
      isChecking: false,
      isRefreshing: false,
      createdAt: "",
    };
  }

  return {
    id: data.id,
    email: data.email,
    role: data.role,
    isAuthenticated: true,
    isChecking: false,
    isRefreshing: isFetching, // Jeśli React Query pobiera dane w tle
    createdAt: data.createdAt,
  };
};
