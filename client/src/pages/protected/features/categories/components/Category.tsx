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
  category: {
    _id: string;
    name: any; 
  };
  isActive: boolean;
  onSelect: () => void;
  lang: string;
}

const Category = ({ category, isActive, onSelect, lang }: CategoryProps) => {
  const renderName = () => {
    if (typeof category.name === "object" && category.name !== null) {
      return category.name[lang] || category.name["pl"] || "Unnamed"; 
    }
    return "Unknown";
  };

  return (
    <CategoryItem $active={isActive} onClick={onSelect}>
      {renderName()}
    </CategoryItem>
  );
};

export default Category;