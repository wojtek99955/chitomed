import styled from "styled-components";
import MaterialsPage from "../features/materials/pages/MaterialsPage";
import { device } from "../../../assets/device";

const Wrapper = styled.div`
  margin: 0 auto;
  width: auto;
  width: 100%;
  top: 140.59px;
  position: relative;
  bottom: 0;
  border: 100%;
  padding: 1rem;
  @media ${device.laptop}{
    top:160px
  }
`;

const Section = styled.div`
  display: flex;
`;

const Dashboard = () => {
  return (
    <>
      <Section>
        <Wrapper>
          <MaterialsPage/>
        </Wrapper>
      </Section>
    </>
  );
};

export default Dashboard;
