import { FaTrashAlt } from "react-icons/fa";
import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
`;

export const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 450px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

export const WarningIcon = styled.div`
  font-size: 48px;
  margin-bottom: 15px;
`;

export const ModalTitle = styled.h3`
  font-size: 20px;
  color: #1e293b;
  margin-bottom: 10px;
`;

export const ModalDescription = styled.p`
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 25px;

  strong {
    color: #0f172a;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #64748b;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f8fafc;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ConfirmButton = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  background: #e11d48; /* Czerwony kolor ostrzegawczy */
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #be123c;
  }

  &:disabled {
    background: #fda4af;
    cursor: not-allowed;
  }
`;

export const DeleteIconButton = styled.button`
  position: absolute;
  right: 20px;
  bottom: 1rem;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition:
    background 0.2s,
    transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #fee2e2;
    transform: scale(1.1);
  }
`;

export const DeleteIcon = styled(FaTrashAlt)`
  font-size: 1rem;
  color: #ff2b2b;
`;

export const ConfirmInputContainer = styled.div`
  margin: 20px 0;
  text-align: left;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }

  small {
    color: #666;
    margin-top: 4px;
    display: block;
  }

  code {
    background: #f1f1f1;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
  }
`;

export const ConfirmInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  font-family: monospace;
  margin-top: 6px;

  &:focus {
    outline: none;
    border-color: #e74c3c;
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
  }
`;