import styled from "styled-components";

export const Button = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem;
  border-radius: 6px;
  width: 100%;
  margin-top: 1rem;
  gap: 0.5rem;
  font-size: 1rem;
  border: 1px solid #e2e8f0;
  background-color: white;
  transition: all 200ms;
  &:hover {
    border-color: #2d50dc;
    background-color: #f2f4fd;
  }
`;