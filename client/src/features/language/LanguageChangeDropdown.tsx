import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { PlFlag } from "../../assets/icons/PlFlag";
import { UsaFlag } from "../../assets/icons/UsaFlag";
import { FrFlag } from "../../assets/icons/FrFlag";

const Container = styled.div`
  position: relative;
  z-index: 1;
`;

const CurrentLanguage = styled.div<any>`
  border: 2px solid white;
  border-radius: 40px;
  padding: 0.7rem 1.8rem;
  cursor: pointer;
  transition: all 200ms;
  font-weight: 500;
  color: white;
  position: relative;
  z-index: 1;
  background-color: #34186e;

  /* &:hover {
    color: #322683;
    background-color: white;
    border-color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 1px solid #4339a2;
  } */
  ${(props) =>
    props.showList &&
    `
    color: #34186E;
    background-color: white;
    border-color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border: 2px solid #34186E;
  `}
`;

const LanguagesList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: white;
  position: absolute;
  z-index: 0;
  width: 100%;
  box-shadow: rgba(100, 100, 111, 0.35) 0px 7px 29px 0px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow: hidden;
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
  cursor: pointer;
  &:hover {
    background-color: #f3f2fa;
  }
`;

const Flag = styled.div`
  width: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LanguageChangeDropdown = () => {
  const [showList, setShowList] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("PL");

    const handleLanguageChange = (lang: string) => {
      setCurrentLanguage(lang);
      setShowList(false);
    };

  return (
    <Container>
      <CurrentLanguage
        showList={showList}
        onMouseEnter={() => setShowList(true)}
        onMouseLeave={() => setShowList(false)}>
        {currentLanguage}
      </CurrentLanguage>
      <AnimatePresence>
        {showList && (
          <LanguagesList
            onMouseEnter={() => setShowList(true)}
            onMouseLeave={() => setShowList(false)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, delay: 0.03 }}>
            <Language onClick={() => handleLanguageChange("PL")}>
              <Flag>{PlFlag}</Flag>PL
            </Language>
            <Language onClick={() => handleLanguageChange("EN")}>
              <Flag>{UsaFlag}</Flag>EN
            </Language>
            <Language onClick={() => handleLanguageChange("FR")}>
              <Flag>{FrFlag}</Flag>FR
            </Language>
          </LanguagesList>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default LanguageChangeDropdown;
