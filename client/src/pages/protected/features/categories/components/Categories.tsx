import { useState, useRef } from "react";
import styled from "styled-components";
import { useGetCategories } from "../api/useGetCategories";
import Category from "./Category";
import { PiArrowsDownUp } from "react-icons/pi";
import { useLanguage } from "../../../../../features/auth/hooks/useLanguage";

const STORAGE_KEY = "selected_category_id";

const Categories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const lang = useLanguage();

  const { data: categoriesData = [], isLoading } = useGetCategories();

  const allCategories = [
    { _id: "all", name: { en: "All", pl: "Wszystko" } },
    ...categoriesData,
  ];

  const [selectedId, setSelectedId] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || "all";
  });

  const selectedCategory = allCategories.find((c) => c._id === selectedId);

  // PANCERNE WYCIĄGANIE NAZWY:
  const getSafeName = (cat: any) => {
    if (!cat || !cat.name) return "Category";
    if (typeof cat.name === "string") return cat.name;
    return cat.name[lang] || cat.name["pl"] || "Category";
  };

  const selectedCategoryName = isLoading
    ? "..."
    : getSafeName(selectedCategory);

    const handleSelect = (id: string) => {
      localStorage.setItem(STORAGE_KEY, id);
      setSelectedId(id);
      setIsOpen(false);
      window.dispatchEvent(new Event("storage_change"));
    };

  return (
    <Wrapper>
      <DropdownContainer ref={dropdownRef}>
        <DropdownButton onClick={() => setIsOpen(!isOpen)} $active={isOpen}>
          <Arrows />
          <span>{selectedCategoryName}</span>
        </DropdownButton>

        {isOpen && (
          <Menu>
            {allCategories.map((cat) => (
              <Category
                key={cat._id}
                category={cat}
                lang={lang}
                isActive={selectedId === cat._id}
                onSelect={() => handleSelect(cat._id)}
              />
            ))}
          </Menu>
        )}
      </DropdownContainer>
    </Wrapper>
  );
};

export default Categories;

const Wrapper = styled.div`
  margin-left: auto;
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  min-width: 200px;
`;

const DropdownButton = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: 0.7rem 1.2rem;
  background-color: white;
  border-radius: 33px;
  border: none;
  display: flex;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  color: #1e293b;
  border: 1px solid transparent;
  transition: all 0.2s;

  &:hover {
    border: 1px solid #2c50dc;
  }
  &:focus {
    box-shadow: 0 0 0 3px rgba(44, 80, 220, 0.1);
    border: 1px solid #2c50dc;
  }
  span {
    white-space: nowrap;
  }
`;

const Arrows = styled(PiArrowsDownUp)`
font-size: 1.3rem;
color:black;
`

const Menu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
  min-width: 200px;
`;
