import styled from "styled-components";
import Nav from "./Nav";
import Logo from "../../../assets/icons/Logo";

const HeaderContainer = styled.header`
  /* background-color: #4339a2; */
  background-color: white;
  position: fixed;
  width: 100%;
  z-index: 1;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: rgba(149, 157, 165, 0.4) 0px 8px 24px;
`;

const Wrapper = styled.div`
  padding: 1.2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: auto;
`;

// const Logo = styled.div`
//   color: white;
//   font-size: 1.5rem;
//   font-weight: 500;
// `;

const LogoButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const DesktopHeader = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <HeaderContainer>
      <Wrapper>
        <LogoButton onClick={scrollToTop}>
          <Logo />
        </LogoButton>{" "}
        <Nav />
      </Wrapper>
    </HeaderContainer>
  );
};

export default DesktopHeader;
