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
    gap: 0.4rem;
    flex-direction: column;
    align-items: center;
    @media ${device.laptop} {
      flex-direction: row;
      align-items: flex-start;
    }
  }
  li {
    color: white;
    font-weight: 500;
    cursor: pointer;
    button {
      text-decoration: none;
      background-color: white;
      border: none;
      font-size: 1.3rem;
      color: #444444;
      padding: 0.7rem;
      cursor: pointer;
      border-radius: 8px;
      transition: all 200ms;
      &:hover {
        background-color: #f4effc;
      }
      &:active {
        background-color: #efe8fb;
      }
      @media ${device.laptop} {
        padding: 0.6rem;
        font-size: 1rem;
      }
    }
  }
`;

const SigninBtn = styled.a`
  border: 2px solid #34186e;
  border:2px solid #58585A;
  border-radius: 40px;
  padding: 0.7rem 1.8rem;
  text-decoration: none;
  color: unset;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #34186e;
  color:#58585A;
  transition: all 200ms;
  font-size: 1rem;
  &:hover {
    background-color: #f4effc;
  }
  &:active {
    background-color: #efe8fb;
  }
`;

const UserIcon = styled(FaRegUserCircle)`
  font-size: 1.4rem;
  color: #34186e;
  color: #58585a;
`;

const Nav = ({ setShowNav }: any) => {
  const scrollToSection = (id: string, offset: number = 200) => {
    if(setShowNav){
    setShowNav(false);

    }
    const section = document.querySelector(id);
    if (section) {
      const elementPosition =
        section.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <NAV>
      <ul>
        <li>
          <button onClick={() => scrollToSection("#about", 100)}>About</button>
        </li>
        <li>
          <button onClick={() => scrollToSection("#solutions", 100)}>
            Solutions
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection("#chitosan", 100)}>
            Chitosan
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection("#brands", 100)}>
            Our brands
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection("#contact", 100)}>
            Contact
          </button>
        </li>
      </ul>
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
