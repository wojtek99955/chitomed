import styled from "styled-components";
import LanguageChangeDropdown from "../../../features/language/LanguageChangeDropdown";
import { device } from "../../../assets/device";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const NAV = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-direction: column;
  width: 500px;
  margin: 0 1rem;
  height: 100%;
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
    height: 100%;
    @media ${device.laptop} {
      flex-direction: row;
      /* align-items: flex-start; */
      align-items: center;
    }
  }
  li {
    /* color: white; */
    cursor: pointer;
    button {
      text-decoration: none;
      background-color: transparent;

      /* background-color: white; */
      border: none;
      font-size: 1.3rem;
      color: #444444;
      padding: 0.7rem;
      cursor: pointer;
      border-radius: 8px;
      transition: all 200ms;
      font-weight: 400;
      font-family: "PP Telegraf";
      &:hover {
        /* background-color: #f4effc; */
      }
      &:active {
        /* background-color: #efe8fb; */
      }
      @media ${device.laptop} {
        padding: 0.6rem;
        font-size: 1rem;
      }
    }
  }
`;

const SigninBtn = styled(Link)`
  border: 2px solid #5069d4;
  border-radius: 40px;
  padding: 0.7rem 1.8rem;
  text-decoration: none;
  color: unset;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  /* color: #5069d4;
  color: #58585a; */
  color: white;
  transition: all 200ms;
  font-size: 1rem;

  background-color: #5069d4;
  &:hover {
    background-color: #f4effc;
  }
  &:active {
    background-color: #efe8fb;
  }
`;

const UserIcon = styled(FaRegUserCircle)`
  font-size: 1.4rem;
  color:white;
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
      <LanguageChangeDropdown />
      <SigninBtn
        to="/sign-in"
        // href="https://chitomed.onrender.com/sign-in"
        // target="_blank"
        // rel="noopener noreferrer"
      >
        <UserIcon /> Sign in
      </SigninBtn>
    </NAV>
  );
};

export default Nav;
