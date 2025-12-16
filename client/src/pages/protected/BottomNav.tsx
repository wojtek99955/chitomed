import { MdMovieEdit, MdOutlinePeopleOutline } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../assets/device";

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  display: block;
  width: 100%;
  background-color: white;
  border-top: 1px solid #e9eaed;
  @media ${device.laptop} {
    display: none;
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

const ACTIVE_BG_COLOR = "#f3f4f6";

// Update Nav styled component to accept the active path prop
const Nav = styled.div`
  display: flex;

  // The 'a' selector is modified to check for the 'data-is-active' attribute
  a {
    text-decoration: none;
    display: block;
    padding: 0.7rem 0.6rem;
    font-size: 1.1rem;
    color: unset;
    transition: all 200ms;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: #1f2937;
    width: 100%;
    background-color: transparent;
    &:first-of-type {
      border-right: 1px solid #e9eaed;
    }

    &:hover {
      background-color: ${ACTIVE_BG_COLOR}; // Use constant
    }
    &:active {
      background-color: #dde0e5;
    }

    // Conditional styling based on the data-is-active attribute
    &[data-is-active="true"] {
      background-color: ${ACTIVE_BG_COLOR}; // Apply hover background for active link
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
          Uzytkownicy
        </Link>
      </Nav>
    </Container>
  );
};

export default BottomNav;
