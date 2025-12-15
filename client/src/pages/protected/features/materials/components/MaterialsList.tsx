import styled from "styled-components";
import { useMaterials } from "../api/useMaterial";
import MaterialItem from "./MaterialItem";

const Container = styled.div`
  max-width: 1100px;
  margin: auto;

  h3 {
    text-align: left;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 1.5rem;
  }
`;

const ListContainer = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const LoadingText = styled.p`
  font-size: 1.1rem;
  color: #3b82f6;
  text-align: center;
`;

const ErrorContainer = styled.div`
  padding: 1rem;
  background-color: #fef2f2;
  border: 1px solid #fca5a5;
  color: #ef4444;
  border-radius: 8px;
  text-align: center;
`;

const MaterialsList = () => {
  const { data: materials, isLoading, isError, error } = useMaterials();

  if (isLoading) {
    return (
      <Container>
        <h3>Materials</h3>
        <LoadingText>Loading materials...</LoadingText>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <h3>Materials</h3>
        <ErrorContainer>
          <p>An error occurred while fetching materials:</p>
          <p>{error.message}</p>
        </ErrorContainer>
      </Container>
    );
  }

  if (!materials) {
    return (
      <Container>
        <h3>Materials</h3>
        <p style={{ textAlign: "center", color: "#6b7280" }}>
          No materials found. Add one to get started!
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <h3>
        Materials (
        {Array.isArray(materials) ? materials.length : materials ? 1 : 0})
      </h3>

      <ListContainer>
        {Array.isArray(materials) ? (
          materials.map((material) => (
            <MaterialItem key={material._id} material={material} />
          ))
        ) : materials ? (
          <MaterialItem key={materials._id} material={materials} />
        ) : null}
      </ListContainer>
    </Container>
  );
};

export default MaterialsList;
