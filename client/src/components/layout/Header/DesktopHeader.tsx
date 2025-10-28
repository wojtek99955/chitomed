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
