import { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  const [query, setQuery] = useState("");

  const handleClear = () => {
    setQuery("");
  };

  return (
    <SearchContainer>
      <IconWrapper>
        <FaSearch />
      </IconWrapper>
      <StyledInput
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && <ClearButton onClick={handleClear}>×</ClearButton>}
    </SearchContainer>
  );
};

export default Searchbar;

// --- STYLED COMPONENTS ---

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 300px;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  display: flex;
  align-items: center;
  color: #2b2f5c;
  font-size: 0.9rem;
  pointer-events: none;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.7rem 1rem 0.7rem 2.8rem;
  padding-left: 3rem;
  font-size: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 33px;
  background-color: white;
  color: #1e293b;
  transition: all 0.2s ease;
  outline: none;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    border-color: #2c50dc;
    box-shadow: 0 0 0 3px rgba(44, 80, 220, 0.1);
    background-color: #fff;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 2rem;
  background: #e2e8f0;
  color: #64748b;
  border: none;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #cbd5e1;
    color: #1e293b;
  }
`;
