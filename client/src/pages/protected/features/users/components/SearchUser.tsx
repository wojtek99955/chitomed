import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const SEARCH_STORAGE_KEY = "users_search_query";

const SearchUser = () => {
  const [query, setQuery] = useState("");

  // RESET PRZY WEJŚCIU:
  // Ten efekt wykona się tylko raz, gdy komponent się pojawi na ekranie
  useEffect(() => {
    // Czyścimy storage
    localStorage.removeItem(SEARCH_STORAGE_KEY);
    // Powiadamiamy inne komponenty/hooki, że filtr jest pusty
    window.dispatchEvent(new Event("storage_change"));
  }, []);

  const handleChange = (val: string) => {
    setQuery(val);
    localStorage.setItem(SEARCH_STORAGE_KEY, val);
    // Powiadamiamy hook useUsers o zmianie podczas pisania
    window.dispatchEvent(new Event("storage_change"));
  };

  const handleClear = () => {
    handleChange("");
  };

  return (
    <SearchContainer>
      <IconWrapper>
        <FaSearch />
      </IconWrapper>
      <StyledInput
        type="text"
        placeholder="Szukaj e-mail..."
        value={query}
        onChange={(e) => handleChange(e.target.value)}
      />
      {query && <ClearButton onClick={handleClear}>×</ClearButton>}
    </SearchContainer>
  );
};

export default SearchUser;

// --- STYLED COMPONENTS ---
// (Pozostają bez zmian, więc skróciłem dla czytelności)
const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 300px;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 1.2rem;
  display: flex;
  align-items: center;
  color: #2b2f5c;
  font-size: 0.9rem;
  pointer-events: none;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.7rem 1rem 0.7rem 2.8rem;
  font-size: 0.95rem;
  border: 1px solid #e2e8f0;
  border-radius: 33px;
  background-color: white;
  color: #1e293b;
  transition: all 0.2s ease;
  outline: none;
  &:hover {
    border-color: #2c50dc;
  }
  &:focus {
    box-shadow: 0 0 0 3px rgba(44, 80, 220, 0.1);
    border-color: #2c50dc;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 1rem;
  background: #e2e8f0;
  color: #64748b;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
`;
