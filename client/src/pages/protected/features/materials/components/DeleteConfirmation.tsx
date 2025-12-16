import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6); /* Ciemniejsze tło */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  text-align: center;
  position: fixed;
`;

const Title = styled.div`
  font-size: 1.5rem;
  display: block;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 700;
`;

const Message = styled.p`
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 1.5rem;
  line-height: 1.4;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const BaseButton = styled.button`
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;

  &:active {
    transform: scale(0.98);
  }
`;

const ConfirmButton = styled(BaseButton)`
  background-color: #dc2626;
  color: white;
  font-size: 1rem;

  &:hover {
    background-color: #b91c1c;
  }
`;

const CancelButton = styled(BaseButton)`
  background-color: #e5e7eb;
  color: #374151;
  font-size: 1rem;
  border: 1px solid #d1d5db;

  &:hover {
    background-color: #d1d5db;
  }
`;

interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
  itemName?: string;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  onConfirm,
  onCancel,
  itemName = "ten element",
}) => {
  return (
    <Overlay
      onClick={onCancel}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <ModalContainer
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}>
        <Title>Potwierdź usunięcie</Title>
        <Message>
          Czy na pewno chcesz usunąć: <b>{itemName}</b>?
          <br />
        </Message>
        <Actions>
          <ConfirmButton onClick={onConfirm}>Tak, usuń</ConfirmButton>
          <CancelButton onClick={onCancel}>Nie, anuluj</CancelButton>
        </Actions>
      </ModalContainer>
    </Overlay>
  );
};

export default DeleteConfirmation;
