import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { api } from "../../api/api";
// 1. Definicja struktury danych wewnątrz tokena (Payload)
interface MyJwtPayload {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

// 2. Definicja struktury stanu zwracanego przez hook
interface AuthData {
  id: string | null;
  email: string | null;
  role: string | null;
  isAuthenticated: boolean;
  isChecking: boolean;
  isRefreshing: boolean;
}

const refreshToken = async () => {
  const response = await api.get("/auth/refresh");
  localStorage.setItem("token", response.data.accessToken);
  return response.data.accessToken;
};

/**
 * Hook useAuthData - synchronicznie i asynchronicznie odczytuje dane użytkownika z tokena JWT.
 * Używa "Lazy Initializer" w useState, aby uniknąć migania interfejsu (isChecking: true).
 * Dodatkowo, obsługuje odświeżanie tokena.
 */
export const useAuthData = () => {
  const [auth, setAuth] = useState<AuthData>({
    id: null,
    email: null,
    role: null,
    isAuthenticated: false,
    isChecking: true,
    isRefreshing: false,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decoded = jwtDecode<MyJwtPayload>(token);
          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            setAuth((prev) => ({ ...prev, isRefreshing: true }));
            try {
              const newToken = await refreshToken();
              const newDecoded = jwtDecode<MyJwtPayload>(newToken);
              setAuth({
                id: newDecoded.id,
                email: newDecoded.email,
                role: newDecoded.role,
                isAuthenticated: true,
                isChecking: false,
                isRefreshing: false,
              });
            } catch (error) {
              console.error("Błąd odświeżania tokena:", error);
              localStorage.removeItem("token");
              setAuth({
                id: null,
                email: null,
                role: null,
                isAuthenticated: false,
                isChecking: false,
                isRefreshing: false,
              });
            }
          } else {
            setAuth({
              id: decoded.id,
              email: decoded.email,
              role: decoded.role,
              isAuthenticated: true,
              isChecking: false,
              isRefreshing: false,
            });
          }
        } catch (error) {
          console.error("Błąd dekodowania tokena:", error);
          setAuth({
            id: null,
            email: null,
            role: null,
            isAuthenticated: false,
            isChecking: false,
            isRefreshing: false,
          });
        }
      } else {
        setAuth({
          id: null,
          email: null,
          role: null,
          isAuthenticated: false,
          isChecking: false,
          isRefreshing: false,
        });
      }
    };

    initializeAuth();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "token") {
        window.location.reload();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return auth;
};