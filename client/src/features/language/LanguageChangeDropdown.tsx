import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import * as S from "./Styles";
import globeIcon from "../../assets/icons/globe.svg"

const LanguageChangeDropdown = () => {
  const [showList, setShowList] = useState(false);

  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem("language") || "pl";
  });

  const handleLanguageChange = (lang: string) => {
    const lowerLang = lang.toLowerCase();
    localStorage.setItem("language", lowerLang);
    setCurrentLanguage(lowerLang);
    setShowList(false);
    window.dispatchEvent(new Event("language_change"));
    window.dispatchEvent(new Event("storage_change"));
  };

  return (
    <S.Wrapper>
      <S.Container onMouseLeave={() => setShowList(false)}>
        <S.CurrentLanguage
          showList={showList}
          onClick={() => {
            setShowList(true);
          }}>
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
              <S.Language onClick={() => handleLanguageChange("pl")}>
                PL
              </S.Language>
              <S.Language onClick={() => handleLanguageChange("en")}>
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
