import styled from "styled-components";
import { device } from "../../../../assets/device";
import { Link, useLocation } from "react-router-dom";
import { RxVideo } from "react-icons/rx";
import { PiUsersFour } from "react-icons/pi";
import { useAuthData } from "../../../../features/auth/hooks/useAuthData";
import { memo } from "react";
import { languages } from "./languages";
import { useLanguage } from "../../../../features/language/useLanguage";

const ACTIVE_BG_COLOR = "white";

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;

  a {
    text-decoration: none;
    padding: 0.7rem 1.2rem;
    font-size: 1.1rem;
    border-radius: 33px;
    transition: all 200ms;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #364760;
    background-color: transparent;

    &:hover {
      color: #1f2937;
      background-color: ${ACTIVE_BG_COLOR};
    }

    &[data-is-active="true"] {
      background-color: ${ACTIVE_BG_COLOR};
      color: #1f2937;
      font-weight: 500;
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  display: none;
  position: fixed;
  min-width: 15rem;
  z-index: 1000;
  background-color: #f3f4f6;

  @media ${device.laptop} {
    display: block;
    left: 0;
    margin-top: 0;
  }
`;

const PeopleIcon = styled(PiUsersFour)`
  font-size: 1.6rem;
  color: #1f2937;
`;

const ContentIcon = styled(RxVideo)`
  font-size: 1.6rem;
  color: #1f2937;
`;

const Name = styled.div`
  height: 160px;
  padding: 1rem 1.2rem;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.8rem;
  color: #6b7280;
  border-bottom: 1px solid #e9eaed;
`;

const Sidebar = () => {
  const { role } = useAuthData();
  const location = useLocation();
  const currentPath = location.pathname;
  const lang = useLanguage();

  const dashboardPath = "/dashboard";
  const usersPath = "/users";

  return (
    <>
      {role === "admin" && (
        <Container>
          <Name>
            Administrator <br />
            menu
          </Name>
          <Nav>
            <Link
              to={dashboardPath}
              data-is-active={currentPath === dashboardPath ? "true" : "false"}>
              <ContentIcon /> {languages.content[lang]}
            </Link>
            <Link
              to={usersPath}
              data-is-active={currentPath === usersPath ? "true" : "false"}>
              <PeopleIcon />
              {languages.users[lang]}
            </Link>
          </Nav>
        </Container>
      )}
    </>
  );
};

export default memo(Sidebar, () => true); // ← brutalnie blokuje rerendery
