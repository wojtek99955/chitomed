import styled from "styled-components";
import LanguageChangeDropdown from "../../../features/language/LanguageChangeDropdown";
import { device } from "../../../assets/device";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

const NAV = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-direction: column;
  width: 500px;
  margin:0 1rem;
  @media ${device.laptop} {
    flex-direction: row;
    margin:0;
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

// const ContactBtn = styled.div`
//   background-color: white;
//   color: #322683;
//   background-color: #7f73e0;
//   padding: 0.7rem 0.9rem;
//   border-radius: 40px;
//   font-weight: 500;
//   transition: all 200ms;
//   border: 2px solid #7f73e0;
//   cursor: pointer;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   background-color: white;
//   @media ${device.laptop} {
//     color: white;
//     background-color: #7f73e0;
//     width: auto;
//   }
//   &:hover {
//     background-color: white;
//     color: #322683;
//     border-color: white;
//   }
// `;

const SigninBtn = styled(Link)`
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
      {/* <ul>
        <li>FAQ</li>
        <li>About</li>
      </ul> */}
      <SigninBtn to="/sign-in"><UserIcon/> Sign in</SigninBtn>
      {/* <ContactBtn>Contact</ContactBtn> */}
      <LanguageChangeDropdown />
    </NAV>
  );
};

export default Nav;
