import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAuthData } from "../../../features/auth/hooks/useAuthData";

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 1rem;
`;

// const Label = styled.span`
//   font-size: 10px;
//   font-weight: 700;
//   color: #9ca3af;
//   text-transform: uppercase;
//   letter-spacing: 0.05em;
//   margin-left: 4px;
// `;

const SwitchRail = styled.div`
  position: relative;
  display: flex;
  border-radius: 9999px;
  background-color: white;
  padding: 4px;
  /* border: 1px solid #e5e7eb; */
`;

const Slider = styled.div<any>`
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: calc(50% - 4px);
  background-color: #2d50dc;
  border-radius: 9999px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transform: ${(props) =>
    props.$isIso ? "translateX(100%)" : "translateX(0)"};
`;

const StyledNavLink = styled(NavLink)<any>`
  position: relative;
  z-index: 1;
  flex: 1;
  padding: 8px 0;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: color 0.2s;
  /* Kolor tekstu zależy od tego, czy link jest aktywny */
  color: ${(props) => (props.$active ? "#ffffff" : "black")};

  &:hover {
    color: ${(props) => (props.$active ? "#ffffff" : "black")};
  }
`;

const ToggleApp = () => {
  const location = useLocation();
  const isIso = location.pathname.startsWith("/iso");
  const { role } = useAuthData();
  
  if (role !== "admin") return null;

  return (

    <ToggleContainer>
      <SwitchRail>
        <Slider $isIso={isIso} />
        <StyledNavLink to="/dashboard" $active={!isIso}>
          EDU
        </StyledNavLink>
        <StyledNavLink to="/iso/orders" $active={isIso}>
          DOCS
        </StyledNavLink>
      </SwitchRail>
    </ToggleContainer>
  );
};

export default ToggleApp;
