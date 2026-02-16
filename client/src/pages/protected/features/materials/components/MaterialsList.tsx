import styled from "styled-components";
import { useMaterials } from "../api/useMaterial";
import MaterialItem from "./MaterialItem";
import { device } from "../../../../../assets/device";
import { useEffect, useState } from "react";

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding-bottom: 4rem;
  @media ${device.laptop} {
    padding-bottom: 0;
  }

  h3 {
    text-align: left;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 1.5rem;
  }
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  @media ${device.tablet}{
    grid-template-columns: 1fr 1fr;
  }

  @media ${device.laptop}{
    grid-template-columns: 1fr 1fr 1fr;
  }
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
  const STORAGE_KEY = "selected_category_id";
  const [filterId, setFilterId] = useState<string | null>(
    localStorage.getItem(STORAGE_KEY),
  );

  useEffect(() => {
    const handleFilterChange = () => {
      setFilterId(localStorage.getItem(STORAGE_KEY));
    };

    window.addEventListener("click", handleFilterChange);
    // Opcjonalnie: nasłuchiwanie zmian z innych kart/okien
    window.addEventListener("storage", handleFilterChange);

    return () => {
      window.removeEventListener("click", handleFilterChange);
      window.removeEventListener("storage", handleFilterChange);
    };
  }, []);

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

  // 3. Logika filtrowania
  const materialArray = Array.isArray(materials)
    ? materials
    : materials
      ? [materials]
      : [];

  const filteredMaterials = materialArray.filter((item) => {
    // Jeśli filtr to 'all' lub nie ma nic wybranego -> pokaż wszystko
    if (!filterId || filterId === "all") return true;

    // W przeciwnym razie dopasuj ID kategorii (pamiętaj o nazwie pola w modelu Material!)
    return item.categoryId === filterId;
  });

  return (
    <Container>
      <h3>Materiały ({filteredMaterials.length})</h3>

      <ListContainer>
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map((material) => (
            <MaterialItem key={material._id} material={material} />
          ))
        ) : (
          <p
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              color: "#6b7280",
              padding: "2rem",
            }}>
            No materials in this category
          </p>
        )}
      </ListContainer>
    </Container>
  );
};

export default MaterialsList;