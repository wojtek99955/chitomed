import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomNav from "../BottomNav";
import { Outlet } from "react-router-dom";

const Wrapper = styled.div`
  margin: 0 auto;
  width: auto;
  background-color: #f8f9fc;
  background-color: #f3f4f6;
  width: 100%;
  height: calc(100vh - 4.5rem);
  position: relative;
  top: 4.5rem;
  bottom: 0;
  border: 100%;
  overflow-y: auto;
  padding: 1rem;
  /* overflow: hidden; */
`;

const Section = styled.div`
  display: flex;
`;

const Dashboard = () => {
  return (
    <>
      <Header />
      <Section>
        <Sidebar />
        <Wrapper>
          <Outlet />
        </Wrapper>
      </Section>
      <BottomNav />
    </>
  );
};

export default Dashboard;
