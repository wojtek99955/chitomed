import { MdMovieEdit, MdOutlinePeopleOutline } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../assets/device";

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: .5rem;
  display: block;
  /* width: %; */
  background-color: rgba(0,0,0,0.80);
  margin: 0 1rem;
  border-radius: 33px;
  padding: .1rem;
  width: 50%;
  @media ${device.laptop} {
    display: none;
  }
`;

const PeopleIcon = styled(MdOutlinePeopleOutline)`
  font-size: 1.5rem;
  color: white;
`;

const ContentIcon = styled(MdMovieEdit)`
  font-size: 1.5rem;
  color: white;
`;


// Update Nav styled component to accept the active path prop
const Nav = styled.div`
  display: flex;

  // The 'a' selector is modified to check for the 'data-is-active' attribute
  a {
    margin: 0.5rem;
    border-radius: 33px;
    text-decoration: none;
    display: block;
    padding: 0.3rem 1rem;
    font-size: 0.8rem;
    color: unset;
    transition: all 200ms;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
    color: white;
    width: 100%;
    background-color: transparent;
    &:first-of-type {
    }

    &:hover {
      background-color: #2d50dc; // Use constant
    }
    &:active {
      background-color: #2d50dc;
    }

    // Conditional styling based on the data-is-active attribute
    &[data-is-active="true"] {
      background-color: #2d50dc; // Apply hover background for active link
    }
  }
`;
const BottomNav = () => {
  const dashboardPath = "/dashboard";
  const usersPath = "/users";
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <Container>
      <Nav>
        {/* 2. Check if the current path matches the link's 'to' prop and pass it as a data attribute */}
        <Link
          to={dashboardPath}
          data-is-active={currentPath === dashboardPath ? "true" : "false"}>
          <ContentIcon /> Treść
        </Link>
        <Link
          to={usersPath}
          data-is-active={currentPath === usersPath ? "true" : "false"}>
          <PeopleIcon />
          Użytkownicy
        </Link>
      </Nav>
    </Container>
  );
};

export default BottomNav;
