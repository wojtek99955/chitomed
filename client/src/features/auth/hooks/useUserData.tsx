import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Zdefiniuj kształt danych w Twoim tokenie
interface DecodedToken {
  id: string;
  email: string;
  role: string; // Tu trafia rola (np. 'admin', 'user')
  exp: number; // Czas wygaśnięcia
  iat: number;
}

export const useUserData = () => {
  const [userData, setUserData] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndDecodeToken = () => {
      try {
        const token = localStorage.getItem("token"); // Nazwa klucza w localStorage

        if (token) {
          const decoded = jwtDecode<DecodedToken>(token);

          // Opcjonalnie: sprawdzenie czy token nie wygasł
          const currentTime = Date.now() / 1000;
          if (decoded.exp < currentTime) {
            console.warn("Token wygasł");
            localStorage.removeItem("token");
            setUserData(null);
          } else {
            setUserData(decoded);
          }
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Błąd podczas dekodowania tokena:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAndDecodeToken();

    // Nasłuchiwanie na zmiany w localStorage (np. wylogowanie w innej karcie)
    window.addEventListener("storage", fetchAndDecodeToken);

    return () => {
      window.removeEventListener("storage", fetchAndDecodeToken);
    };
  }, []);

  return {
    userData,
    role: userData?.role || null,
    id: userData?.id || null,
    isAuthenticated: !!userData,
    loading,
  };
};
