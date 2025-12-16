import styled from "styled-components";
import Header from "./Header";
import MaterialsPage from "../features/materials/pages/MaterialsPage";
import Sidebar from "./Sidebar";
import BottomNav from "../BottomNav";

const Wrapper = styled.div`
  margin: 0 auto;
  width: auto;
  background-color: #f8f9fc;
  width: 100%;
  height: calc(100vh - 4.5rem);
  position: relative;
  top: 4.5rem;
  bottom: 0;
  border: 100%;
  overflow-y: auto;
  padding:1rem;
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
          <MaterialsPage />
        </Wrapper>
      </Section>
      <BottomNav />
    </>
  );
};

export default Dashboard;
