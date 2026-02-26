import { AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react"; // Dodano useRef i useEffect
import * as S from "./Styles";
import globeIcon from "../../assets/icons/globe.svg";

const LanguageChangeDropdown = () => {
  const [showList, setShowList] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Referencja do kontenera

  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem("language") || "pl";
  });

  // Logika zamykania po kliknięciu poza elementem
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Jeśli kliknięcie nastąpiło poza dropdownRef, zamknij listę
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowList(false);
      }
    };

    if (showList) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showList]);

const handleLanguageChange = (e: React.MouseEvent, lang: string) => {
  e.stopPropagation(); // To kluczowa zmiana
  const lowerLang = lang.toLowerCase();
  localStorage.setItem("language", lowerLang);
  setCurrentLanguage(lowerLang);
  window.dispatchEvent(new Event("language_change"));
  window.dispatchEvent(new Event("storage_change"));
  setShowList(false);
};

  return (
    <S.Wrapper ref={dropdownRef}>
      {" "}
      {/* Przypisujemy ref tutaj */}
      <S.Container onClick={() => setShowList((prev) => !prev)}>
        <S.CurrentLanguage showList={showList}>
          <S.GlobeIconContainer>
            <img src={globeIcon} alt="" />
          </S.GlobeIconContainer>
          {currentLanguage.toUpperCase()}
        </S.CurrentLanguage>

        <AnimatePresence>
          {showList && (
            <S.LanguagesList
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}>
              <S.Language onClick={(e) => handleLanguageChange(e, "pl")}>
                PL
              </S.Language>
              <S.Language onClick={(e) => handleLanguageChange(e, "en")}>
                EN
              </S.Language>
            </S.LanguagesList>
          )}
        </AnimatePresence>
      </S.Container>
    </S.Wrapper>
  );
};

export default LanguageChangeDropdown;
