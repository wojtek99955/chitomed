import styled from 'styled-components';
import AddMaterialModal from '../components/AddMaterial'
import MaterialsList from '../components/MaterialsList'
const Container = styled.div`
padding-top: 2rem;
`
const MaterialsPage = () => {
    

  return (
    <Container>
      <AddMaterialModal />
      <MaterialsList />
    </Container>
  );
}

export default MaterialsPage