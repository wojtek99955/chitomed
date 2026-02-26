import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border-right: 1px solid #e9eaed;
  margin-left: auto;
  margin-right: 1rem;
  padding-right: 1rem;
`;
const Container = styled.div`
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  align-items: center;
`;

const CurrentLanguage = styled.div<{ showList: boolean }>`
  padding: 0.7rem 1.8rem;
  cursor: pointer;
  font-weight: 500;
  color: black;
  position: relative;
  z-index: 1;

  ${(props) =>
    props.showList &&
    `
    color: #34186E;
    background-color: white;
    border-bottom:none;
  `}
`;

const LanguagesList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: white;
  position: absolute;
  z-index: 0;
  width: 100%;
  overflow: hidden;
  border:1px solid #e9eaed;
  top: 100%;
`;

const Language = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: all 200ms;
  color: #58585a;
  &:hover {
    color: #34186e;
    background-color: #e7eaf5;
  }
`;

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
    <Wrapper>
      <Container onMouseLeave={() => setShowList(false)}>
        <CurrentLanguage
          showList={showList}
          onMouseEnter={() => setShowList(true)}>
          {currentLanguage.toUpperCase()}
        </CurrentLanguage>

        <AnimatePresence>
          {showList && (
            <LanguagesList
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}>
              <Language onClick={() => handleLanguageChange("pl")}>PL</Language>
              <Language onClick={() => handleLanguageChange("en")}>EN</Language>
            </LanguagesList>
          )}
        </AnimatePresence>
      </Container>
    </Wrapper>
  );
};

export default LanguageChangeDropdown;
