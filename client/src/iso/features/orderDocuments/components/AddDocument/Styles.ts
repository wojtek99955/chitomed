import styled from "styled-components";
import { device } from "../../../../../assets/device";

export const Button = styled.button`
  margin-top: 2rem;
  margin-bottom: 5rem;
  width: 100%;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px dashed #3b82f6;
  background: rgba(59, 130, 246, 0.05);
  color: #2563eb;
  font-weight: 500;
  font-size: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  @media ${device.tablet}{
    margin-bottom: 2rem;
  }

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(59, 130, 246, 0.1);
    border-color: #2d50dc;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
