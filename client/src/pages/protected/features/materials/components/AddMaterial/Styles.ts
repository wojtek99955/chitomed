import { Field } from "formik";
import { MdClose } from "react-icons/md";
import styled from "styled-components";

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1100px;
  width: 100%;
  margin: auto;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  color: white;
  background-color: #d6dcf8;
  background-color: #2c50dc;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid #2c50dc;
  transition: all 0.2s;
  margin-bottom: 2rem;
  color: #000;
  color: white;

  &:hover {
    background: #2c50dc;
    color: white;
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1.01);
  }
`;

export const ModalOverlay = styled.div`

`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  width: 90%;
  padding: 2rem;
  margin: auto;
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1.5rem;
`;
export const FormTitle = styled.h2`
  font-size: 1.5rem;
  color: #1f2937;
  padding-bottom: 0.5rem;
  margin-bottom: 0;
`;

export const FormSection = styled.div`
  margin-bottom: 1.5rem;
  textarea {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 1rem;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;
    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
    }
  }
  select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%236B7280'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1em;
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 1rem;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
    }
  }
`;

export const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.4rem;
`;

export const Input = styled(Field)`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
  }
`;

export const SubmitButton = styled.button`
  padding: 0.9rem 2rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;

  &:hover:not(:disabled) {
    background: #2563eb;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
  &:hover {
    transform: scale(1.01);
  }
  &:active {
    transform: scale(0.99);
  }
`;

export const CancelButton = styled.button`
  padding: 0.9rem 2rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;

  &:hover {
    background: #dde0e5 !important;
    transform: scale(1.01);
  }
  &:active {
    transform: scale(0.99);
  }
`;

export const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.9rem;
  margin-top: 0.4rem;
  font-weight: 500;
`;

export const CloseContainer = styled.div`
  background-color: #f3f4f6;
  aspect-ratio: 1/1;
  padding: 0.3rem;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 200ms;
  &:hover {
    background-color: #dde0e5;
  }
`;

export const CloseIcon = styled(MdClose)`
  font-size: 1.7rem;
`;
