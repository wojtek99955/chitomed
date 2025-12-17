import styled from "styled-components";
import AddMaterialModal from "../components/AddMaterial";
import MaterialsList from "../components/MaterialsList";
import { useAuthData } from "../../../../../features/auth/useAuthData";
const Container = styled.div`
  padding-top: 2rem;
`;
const MaterialsPage = () => {
  const { role } = useAuthData();

  return (
    <Container>
      {role === "admin" && <AddMaterialModal />}
      <MaterialsList />
    </Container>
  );
};

export default MaterialsPage;
