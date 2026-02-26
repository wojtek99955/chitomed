import styled from "styled-components";
import MaterialsPage from "../features/materials/pages/MaterialsPage/MaterialsPage";
import { device } from "../../../assets/device";
import { useEffect } from "react";

const Wrapper = styled.div`
  margin: 0 auto;
  width: auto;
  width: 100%;
  top: 140.59px;
  position: relative;
  bottom: 0;
  border: 100%;
  padding: 1rem;
  min-height: 100vh;
  @media ${device.laptop} {
    top: 170px;
  }
`;

const Section = styled.div`
  display: flex;
`;

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Section>
        <Wrapper>
          <MaterialsPage />
        </Wrapper>
      </Section>
    </>
  );
};

export default Dashboard;
