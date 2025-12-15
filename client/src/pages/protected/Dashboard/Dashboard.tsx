import styled from "styled-components"
import Header from "./Header"
import MaterialsPage from "../features/materials/pages/MaterialsPage"

const Wrapper = styled.div`
max-width: 1100px;
margin: auto;
`

const Dashboard = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <MaterialsPage />
      </Wrapper>
    </>
  );
}

export default Dashboard