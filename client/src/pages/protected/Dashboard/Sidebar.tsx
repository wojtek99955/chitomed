import styled from "styled-components";
import { device } from "../../../assets/device";
// Import useLocation for checking the current route
import { Link, useLocation } from "react-router-dom";
import { MdMovieEdit } from "react-icons/md";
import { MdOutlinePeopleOutline } from "react-icons/md";

// Define the hover/active background color as a constant for easy reuse
const ACTIVE_BG_COLOR = "#f3f4f6";

// Update Nav styled component to accept the active path prop
const Nav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  // The 'a' selector is modified to check for the 'data-is-active' attribute
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
    color: #1f2937;

    // Default background color (can be overridden below)
    background-color: transparent;

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

// ... (Other styled components remain the same)

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

const PeopleIcon = styled(MdOutlinePeopleOutline)`
  font-size: 1.8rem;
  color: #1f2937;
`;

const ContentIcon = styled(MdMovieEdit)`
  font-size: 1.8rem;
  color: #1f2937;
`;

const Sidebar = () => {
  // 1. Use the useLocation hook to get the current path
  const location = useLocation();
  const currentPath = location.pathname;

  // Define the paths for the links
  const dashboardPath = "/dashboard";
  const usersPath = "/users";

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

export default Sidebar;
