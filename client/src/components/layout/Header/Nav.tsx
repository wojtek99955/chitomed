import styled from "styled-components";
import LanguageChangeDropdown from "../../../features/language/LanguageChangeDropdown";
import { device } from "../../../assets/device";

const NAV = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-direction: column;
  @media ${device.laptop} {
    flex-direction: row;
  }
  ul {
    list-style: none;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    @media ${device.laptop} {
      flex-direction: row;
    }
  }
  li {
    color: white;
    font-weight: 500;
    cursor: pointer;
  }
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
const Nav = () => {
  return (
    <NAV>
      <ul>
        <li>FAQ</li>
        <li>About</li>
      </ul>
      <ContactBtn>Contact</ContactBtn>
      <LanguageChangeDropdown />
    </NAV>
  );
};

export default Nav;
