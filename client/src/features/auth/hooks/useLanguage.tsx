import { useState, useEffect } from "react";

export const useLanguage = () => {
  const [lang, setLang] = useState(
    () => localStorage.getItem("language") || "pl",
  );

  useEffect(() => {
    const handleUpdate = () => {
      setLang(localStorage.getItem("language") || "pl");
    };

    window.addEventListener("language_change", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("language_change", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return lang as "pl" | "en";
};
