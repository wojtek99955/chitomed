// MainLayout.tsx
import styled from "styled-components";
import Sidebar from "../../pages/protected/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh; // całkowita wysokość viewportu
  background-color: white;
`;

const Content = styled.main`
  flex: 1; // zajmuje całą pozostałą szerokość
  background-color: white;
`;

const MainLayout = () => {
  return (
    <LayoutWrapper>
      <Sidebar /> {/* Sidebar jest stały, niezależny od zmiany route */}
      <Content>
        <Outlet /> {/* Tu zmienia się treść */}
      </Content>
    </LayoutWrapper>
  );
};

export default MainLayout;
