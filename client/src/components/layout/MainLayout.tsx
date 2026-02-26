// MainLayout.tsx
import styled from "styled-components";
import Sidebar from "../../pages/protected/Dashboard/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav/BottomNav";
import Header from "./Header/Header";

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
      <Header/>
      <Sidebar /> {/* Sidebar jest stały, niezależny od zmiany route */}
      <Content>
        <Outlet /> {/* Tu zmienia się treść */}
      </Content>
      <BottomNav/>
    </LayoutWrapper>
  );
};

export default MainLayout;
