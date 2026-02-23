import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";


const Wrapper = styled.div`
  border-right: 1px solid grey;
  margin-left: auto;
  margin-right: 1rem;
  padding-right: 1rem;
`;
const Container = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: center;

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
  background-color: #58585a;

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
    border: 2px solid #58585A;
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
  top: 3rem;
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
  &:active {
    background-color: #e9e7f6;
  }
`;

const LanguageChangeDropdown = () => {
  const [showList, setShowList] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("PL");

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    setShowList(false);
  };

  return (
    <Wrapper>
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
              <Language onClick={() => handleLanguageChange("PL")}>PL</Language>
              <Language onClick={() => handleLanguageChange("EN")}>EN</Language>
            </LanguagesList>
          )}
        </AnimatePresence>
      </Container>
    </Wrapper>
  );
};

export default LanguageChangeDropdown;
