import styled from "styled-components";
import Nav from "./Nav";

const HeaderContainer = styled.header`
  background-color: #4339a2;
  position: fixed;
  width: 100%;
  z-index: 1
  ;
`;

const Wrapper = styled.div`
  padding: 1.2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: auto;
`;

const Logo = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
`;



const ContactBtn = styled.div`
  color: white;
  background-color: #7f73e0;
  padding: 0.7rem 0.9rem;
  border-radius: 40px;
  font-weight: 500;
  transition: all 200ms;
  border: 2px solid #7f73e0;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #322683;
    border-color: white;
  }
`;

const DesktopHeader = () => {
  return (
    <HeaderContainer>
      <Wrapper>
        <Logo>Logo</Logo>
        <Nav/>
      </Wrapper>
    </HeaderContainer>
  );
};

export default DesktopHeader;
