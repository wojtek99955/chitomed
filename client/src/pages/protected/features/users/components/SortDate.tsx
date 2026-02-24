import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { PiArrowsDownUp } from "react-icons/pi";

// Klucz do localStorage dla sortowania
const SORT_STORAGE_KEY = "users_sort_direction";

const sortOptions = [
  { id: "newest", name: "Najnowsi" },
  { id: "oldest", name: "Najstarsi" },
];

const SortDateUsers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Pobieramy kierunek sortowania z localStorage lub domyślnie "newest"
  const [selectedSort, setSelectedSort] = useState(() => {
    return localStorage.getItem(SORT_STORAGE_KEY) || "newest";
  });

  const selectedSortName =
    sortOptions.find((opt) => opt.id === selectedSort)?.name || "Sortuj";

  const handleSelect = (id: string) => {
    localStorage.setItem(SORT_STORAGE_KEY, id);
    setSelectedSort(id);
    setIsOpen(false);

    // Wywołujemy zdarzenie, aby inne komponenty (np. lista użytkowników)
    // wiedziały, że trzeba ponownie pobrać dane z nowym sortowaniem
    window.dispatchEvent(new Event("storage_change"));
  };

  // Zamknij przy kliknięciu poza dropdownem
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Wrapper>
      <DropdownContainer ref={dropdownRef}>
        <DropdownButton onClick={() => setIsOpen(!isOpen)} $active={isOpen}>
          <Arrows />
          <span>{selectedSortName}</span>
        </DropdownButton>

        {isOpen && (
          <Menu>
            {sortOptions.map((opt) => (
              <SortOption
                key={opt.id}
                $isActive={selectedSort === opt.id}
                onClick={() => handleSelect(opt.id)}>
                {opt.name}
              </SortOption>
            ))}
          </Menu>
        )}
      </DropdownContainer>
    </Wrapper>
  );
};

export default SortDateUsers;

// --- STYLE (Spójne z Twoim komponentem Categories) ---

const Wrapper = styled.div`
  padding: 0 1rem;
  margin-left: auto;
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  min-width: 140px;
`;

const DropdownButton = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: 0.7rem 1.2rem;
  background-color: white;
  border-radius: 33px;
  display: flex;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  font-size: 0.95rem;
  color: #1e293b;
  border: 1px solid ${(props) => (props.$active ? "#2c50dc" : "transparent")};
  transition: all 0.2s;

  &:hover {
    border: 1px solid #2c50dc;
  }
  &:focus {
    box-shadow: 0 0 0 3px rgba(44, 80, 220, 0.1);
  }
`;

const Arrows = styled(PiArrowsDownUp)`
  font-size: 1.2rem;
  color: #64748b;
`;

const Menu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 100%;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
`;

const SortOption = styled.div<{ $isActive: boolean }>`
  padding: 0.8rem 1.2rem;
  cursor: pointer;
  font-size: 0.9rem;
  background-color: ${(props) => (props.$isActive ? "#f1f5f9" : "transparent")};
  color: ${(props) => (props.$isActive ? "#2c50dc" : "#1e293b")};
  font-weight: ${(props) => (props.$isActive ? "600" : "400")};
  transition: background 0.2s;

  &:hover {
    background-color: #f8fafc;
  }
`;
