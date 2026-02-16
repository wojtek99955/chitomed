import styled, { keyframes } from "styled-components";
import { useGetCategories } from "../api/useGetCategories";
import Category from "./Category";

const Categories = () => {
  const {
    data: categoriesData = [],
    isLoading,
    isError,
    error,
  } = useGetCategories();

  const allCategories = [
    { _id: "all", name: "Wszystko" },
    ...categoriesData,
  ];

  if (isLoading) {
    return (
      <Center>
        <Spinner />
        <LoadingText>Loading...</LoadingText>
      </Center>
    );
  }

  if (isError) {
    return (
      <ErrorBox>
        <strong>Error:</strong>
        {error?.message || "Try again later."}
      </ErrorBox>
    );
  }

  return (
    <Wrapper>
      <Grid>
        {allCategories.length > 1 ? (
          allCategories.map((category) => (
            <Category key={category._id} category={category} />
          ))
        ) : (
          <EmptyText>No categories</EmptyText>
        )}
      </Grid>
    </Wrapper>
  );
};

export default Categories;

// --- STYLED COMPONENTS ---

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Wrapper = styled.div`
  padding: 0rem;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;



const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3182ce;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  color: #718096;
`;

const ErrorBox = styled.div`
  margin: 2rem;
  padding: 1rem;
  background-color: #fff5f5;
  border-left: 4px solid #f56565;
  color: #c53030;
  border-radius: 4px;
`;

const EmptyText = styled.p`
  color: #a0aec0;
  font-style: italic;
`;
