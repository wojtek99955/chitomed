import styled from "styled-components";
import { device } from "../../../assets/device";
import { Link } from "react-router-dom";
import { MdMovieEdit } from "react-icons/md";
import { MdOutlinePeopleOutline } from "react-icons/md";

const Container = styled.div`
  height: calc(100vh - 4.5rem);
  display: none;
  border-right: 1px solid #e9eaed;
  padding: 0.5rem;
  min-width: 15rem;
  background-color: white;

  @media ${device.laptop} {
    display: block;
    left: 0;
    margin-top: 4.5rem;
  }
`;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  a {
    text-decoration: none;
    display: block;
    padding: 0.7rem 0.6rem;
    font-size: 1.1rem;
    border-radius: 6px;
    color: unset;
    transition: all 200ms;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color:#1F2937;
     &:hover {
      background-color: #f3f4f6;
    }
    &:active {
      background-color: #dde0e5;
    }
  }
`;

const PeopleIcon = styled(MdOutlinePeopleOutline)`
  font-size: 1.8rem;
  color: #1f2937;
`;

const ContentIcon = styled(MdMovieEdit)`
  font-size: 1.8rem;
  color: #1f2937;
`;
const Sidebar = () => {
  return (
    <Container>
      <Nav>
        <Link to="/dashboard">
          <ContentIcon /> Treść
        </Link>
        <Link to="/users">
          <PeopleIcon />
          Uzytkownicy
        </Link>
      </Nav>
    </Container>
  );
};

export default Sidebar;
