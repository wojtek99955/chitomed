import styled from "styled-components";
import { FaExclamationTriangle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Overlay = styled(motion.div)`
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
  padding: 1rem;
`;

const ModalContainer = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

// ... reszta styli pozostaje bez zmian ...
const IconWrapper = styled.div`
  color: #ef4444;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
  color: #1f2937;
`;

const Text = styled.p`
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  font-size: 1rem;
  strong {
    color: #2d50dc;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-direction: column;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
  border: none;
  background: ${(props) => (props.$primary ? "#ef4444" : "#e5e7eb")};
  color: ${(props) => (props.$primary ? "white" : "#374151")};
  &:hover {
    filter: brightness(0.9);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  email: string;
}

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  email,
}: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}>
          <ModalContainer
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}>
            <IconWrapper>
              <FaExclamationTriangle />
            </IconWrapper>
            <Title>Usuwanie użytkownika</Title>
            <Text>
              Czy na pewno chcesz usunąć użytkownika <strong>{email}</strong>?
              Tej operacji nie można cofnąć.
            </Text>
            <ButtonGroup>
              <Button onClick={onClose} disabled={isLoading}>
                Anuluj
              </Button>
              <Button $primary onClick={onConfirm} disabled={isLoading}>
                {isLoading ? "Usuwanie..." : "Tak, usuń"}
              </Button>
            </ButtonGroup>
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
