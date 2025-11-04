import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import Nav from "./Nav";
import Logo from "../../../assets/icons/Logo";

const Header = styled.div`
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: rgba(149, 157, 165, 0.4) 0px 8px 24px;
  background-color: white;
  position: fixed;
  width: 100%;
  z-index: 1;
`;

const Wrapper = styled.div`
  padding: .7rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  position: relative;
  z-index: 1100;
`;

const Hamburger = styled.div<any>`
  width: 60px;
  height: 60px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-left: auto;
  transition-duration: 0.5s;
  cursor: pointer;

  div {
    transition-duration: 0.5s;
    position: absolute;
    height: 4px;
    width: 30px;
    top: 30px;
    border-radius: 4px;
    left: 15px;
    transition-duration: 0.5s;
    background: ${({ showNav }) => (showNav ? "transparent" : "#34136c")};

    &:before {
      border-radius: 4px;
      transition-duration: 0.5s;
      position: absolute;
      width: 30px;
      height: 4px;
      background-color: #34136c;
      content: "";
      top: -10px;
      transform: ${({ showNav }) =>
        showNav
          ? "rotateZ(45deg) scaleX(1.25) translate(6.5px, 6.5px)"
          : "none"};
    }

    &:after {
      border-radius: 4px;
      transition-duration: 0.5s;
      position: absolute;
      width: 30px;
      height: 4px;
      background-color: #34136c;
      content: "";
      top: 10px;
      transform: ${({ showNav }) =>
        showNav ? "rotateZ(-45deg) scaleX(1.25) translate(6px, -6px)" : "none"};
    }
  }
`;

const NavContainer = styled(motion.div)`
  height: 100%;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MobileHeader = () => {

      const [showNav, setShowNav] = useState(false);

      const toggleSidebar = () => {
        setShowNav((prev) => !prev);
      };
  return (
    <Header>
      <Wrapper>
        <Logo/>
        <Hamburger
          className="menu btn15"
          data-menu="15"
          onClick={toggleSidebar}
          showNav={showNav}>
          <div className="icon"></div>
        </Hamburger>
      </Wrapper>
      <AnimatePresence>
        {showNav && (
          <NavContainer initial={{ y: "-100vh" }} animate={{ y: 0 }} exit={{y:"-100vh"}}>
            <Nav/>
          </NavContainer>
        )}
      </AnimatePresence>
    </Header>
  );
};

export default MobileHeader;
