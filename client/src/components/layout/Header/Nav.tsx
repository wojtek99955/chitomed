import styled from "styled-components";
import LanguageChangeDropdown from "../../../features/language/LanguageChangeDropdown";
import { device } from "../../../assets/device";
import { FaRegUserCircle } from "react-icons/fa";

const NAV = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-direction: column;
  width: 500px;
  margin: 0 1rem;
  @media ${device.laptop} {
    flex-direction: row;
    margin: 0;
    width: auto;
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

const SigninBtn = styled.a`
  border: 2px solid #34186e;
  border-radius: 40px;
  padding: 0.7rem 1.8rem;
  text-decoration: none;
  color: unset;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #34186e;
  transition: all 200ms;
  &:hover {
    background-color: #dcd1f5;
  }
`;

const UserIcon = styled(FaRegUserCircle)`
  font-size: 1.4rem;
  color: #34186e;
`;

const Nav = () => {
  return (
    <NAV>
      <SigninBtn
        href="https://chitomed.onrender.com/sign-in"
        target="_blank"
        rel="noopener noreferrer">
        <UserIcon /> Sign in
      </SigninBtn>
      <LanguageChangeDropdown />
    </NAV>
  );
};

export default Nav;
