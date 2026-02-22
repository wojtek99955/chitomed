import styled from "styled-components";

const CategoryItem = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.2rem;
  font-size: 0.95rem;
  color: ${(props) => (props.$active ? "#2C50DC" : "#334155")};
  background-color: ${(props) => (props.$active ? "#f0f4ff" : "transparent")};
  font-weight: ${(props) => (props.$active ? "600" : "400")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
    color: #2c50dc;
    span {
      opacity: 1;
    }
  }
`;

interface CategoryProps {
  category: { _id: string; name: string };
  isActive: boolean;
  onSelect: () => void;
}

const Category = ({ category, isActive, onSelect }: CategoryProps) => {
  return (
    <CategoryItem $active={isActive} onClick={onSelect}>
      {category.name}
    </CategoryItem>
  );
};

export default Category;
