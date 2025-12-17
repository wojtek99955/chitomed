import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

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
}

/**
 * Hook useAuthData - synchronicznie odczytuje dane użytkownika z tokena JWT.
 * Używa "Lazy Initializer" w useState, aby uniknąć migania interfejsu (isChecking: true).
 */
export const useAuthData = () => {
  const [auth, _setAuth] = useState<AuthData>(() => {
    // Sprawdzamy token już w momencie tworzenia stanu (inicjalizacja synchroniczna)
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode<MyJwtPayload>(token);

        // Sprawdzanie wygaśnięcia tokena (opcjonalne, ale zalecane)
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
          return {
            id: null,
            email: null,
            role: null,
            isAuthenticated: false,
            isChecking: false,
          };
        }

        return {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
          isAuthenticated: true,
          isChecking: false,
        };
      } catch (error) {
        console.error("Błąd dekodowania tokena:", error);
        return {
          id: null,
          email: null,
          role: null,
          isAuthenticated: false,
          isChecking: false,
        };
      }
    }

    // Brak tokena w localStorage
    return {
      id: null,
      email: null,
      role: null,
      isAuthenticated: false,
      isChecking: false,
    };
  });

  useEffect(() => {
    // Ten efekt może służyć do synchronizacji między kartami przeglądarki
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "token") {
        window.location.reload(); // Najprostszy sposób na odświeżenie uprawnień
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return auth;
};
