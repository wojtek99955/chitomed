import styled from "styled-components";
import { useGetCategories } from "../api/useGetCategories";
import Category from "./Category";
import SkeletonLoader from "../../../../../components/SkeletonLoader";

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
      <Wrapper>
        <LoaderContainer>
          <CategorySkeleton>
            <SkeletonLoader />
          </CategorySkeleton>
          <CategorySkeleton>
            <SkeletonLoader />
          </CategorySkeleton>
          <CategorySkeleton>
            <SkeletonLoader />
          </CategorySkeleton>
          <CategorySkeleton>
            <SkeletonLoader />
          </CategorySkeleton>
          <CategorySkeleton>
            <SkeletonLoader />
          </CategorySkeleton>
        </LoaderContainer>
      </Wrapper>
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


const Wrapper = styled.div`
  padding: 0rem;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
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

const CategorySkeleton = styled.div`
  width: 100px;
  height: 40px;
  border-radius: 20px;
  position: relative;
  padding: 10px 20px;

  border-radius: 9999px;
`;
const LoaderContainer = styled.div`
display: flex;
gap:1rem;
`