import styled from "styled-components";
import Header from "./Header";
import BottomNav from "../BottomNav";
import { useAuthData } from "../../../features/auth/useAuthData";
import MaterialsPage from "../features/materials/pages/MaterialsPage";

const Wrapper = styled.div`
  margin: 0 auto;
  width: auto;
  width: 100%;
  height: calc(100vh - 180.59px);
  top: 180.59px;
  position: relative;
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
  const {role} = useAuthData();
  return (
    <>
      <Header />
      <Section>
        <Wrapper>
          <MaterialsPage/>
        </Wrapper>
      </Section>
      {role === "admin" && <BottomNav />}
    </>
  );
};

export default Dashboard;
