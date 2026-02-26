import { useEffect, useState } from "react";

type Language = "pl" | "en";

export const useLanguage = (): Language => {
  const getValidLang = (): Language => {
    const stored = localStorage.getItem("language");
    return stored === "pl" || stored === "en" ? stored : "pl";
  };

  const [lang, setLang] = useState<Language>(getValidLang);

  useEffect(() => {
    const handleUpdate = () => {
      setLang(getValidLang());
    };

    window.addEventListener("language_change", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("language_change", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return lang;
};
