import styled from "styled-components";
import LanguageChangeDropdown from "../../features/language/LanguageChangeDropdown";

const HeaderContainer = styled.header`
  background-color: #4339a2;
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

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;
  ul {
    list-style: none;
    display: flex;
    gap: 1rem;
  }
  li {
    color: white;
    font-weight: 500;
  }
`;

const ContactBtn = styled.div`
  color: white;
  background-color: #7f73e0;
  padding: 0.7rem 0.9rem;
  border-radius: 40px;
  font-weight: 500;
  transition: all 200ms;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #322683;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Wrapper>
        <Logo>Logo</Logo>
        <Nav>
          <ul>
            <li>FAQ</li>
            <li>About</li>
          </ul>
          <ContactBtn>Contact</ContactBtn>
          <LanguageChangeDropdown />
        </Nav>
      </Wrapper>
    </HeaderContainer>
  );
};

export default Header;
