import { useState, useEffect } from "react";
import styled from "styled-components";

const CategoryPill = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: ${(props) => (props.$active ? "#2C50DC" : "#ffffff")};
  color: ${(props) => (props.$active ? "#ffffff" : "#4a5568")};
  border: 1px solid ${(props) => (props.$active ? "#2C50DC" : "#e2e8f0")};
  border-radius: 9999px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  user-select: none;

  span {
    color: ${(props) => (props.$active ? "#ebf8ff" : "#2C50DC")};
    margin-right: 6px;
    font-weight: bold;
  }

  &:hover {
    background-color: ${(props) => (props.$active ? "#2C50DC" : "#f7fafc")};
    border-color: #2c50dc;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

interface CategoryProps {
  category: {
    _id: string;
    name: string;
  };
}

const Category = ({ category }: CategoryProps) => {
  const STORAGE_KEY = "selected_category_id";

  // Stan inicjalizowany bezpośrednio z localStorage
  const [isActive, setIsActive] = useState<boolean>(() => {
    const savedId = localStorage.getItem(STORAGE_KEY);
    return savedId === category._id;
  });

  // Reagowanie na zmiany w innych komponentach (opcjonalne, ale pomocne)
  useEffect(() => {
    const checkStorage = () => {
      const savedId = localStorage.getItem(STORAGE_KEY);
      setIsActive(savedId === category._id);
    };

    // Nasłuchiwanie na zmiany w localStorage w obrębie tej samej karty
    window.addEventListener("click", checkStorage);
    return () => window.removeEventListener("click", checkStorage);
  }, [category._id]);

  const toggleCategory = () => {
    const currentSavedId = localStorage.getItem(STORAGE_KEY);

    if (currentSavedId === category._id) {
      // Jeśli klikamy w już aktywną - usuwamy
      localStorage.removeItem(STORAGE_KEY);
      setIsActive(false);
    } else {
      // Zapisujemy nowe ID
      localStorage.setItem(STORAGE_KEY, category._id);
      setIsActive(true);

      // Wywołujemy sztuczne zdarzenie 'storage', aby inne komponenty Category
      // dowiedziały się, że powinny się odznaczyć
      window.dispatchEvent(new Event("click"));
    }
  };

  return (
    <CategoryPill $active={isActive} onClick={toggleCategory}>
      <span>#</span>
      {category.name}
    </CategoryPill>
  );
};

export default Category;
