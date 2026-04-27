import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import * as S from "./Styles";
import { useDeleteOrder } from "../../../orders/api/useDeleteOrder";

interface DeleteOrderModalProps {
  orderId: string;
  documentName?: string;
  onDeleted?: () => void;
}

const DeleteOrderModal = ({
  orderId,
  documentName,
  onDeleted,
}: DeleteOrderModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmInput, setConfirmInput] = useState("");
  const { mutate: deleteOrder, isPending } = useDeleteOrder();

  // Blokowanie scrolla w tle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Reset inputu przy otwieraniu/zamykaniu
  useEffect(() => {
    if (!isOpen) {
      setConfirmInput("");
    }
  }, [isOpen]);

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (confirmInput.trim() !== orderId) return;

    deleteOrder(orderId, {
      onSuccess: () => {
        closeModal();
        onDeleted?.();
        // Tutaj możesz dodać toast: "Zamówienie zostało pomyślnie usunięte"
      },
      onError: (err: any) => {
        alert("Błąd podczas usuwania: " + (err?.message || "Nieznany błąd"));
      },
    });
  };

  const canDelete = confirmInput.trim() === orderId && !isPending;

  // Przycisk usuwania (pozostaje w normalnym drzewie)
  const button = (
    <S.DeleteIconButton onClick={openModal}>
      <S.DeleteIcon />
    </S.DeleteIconButton>
  );

  // Modal przez Portal
  const modalContent = isOpen
    ? ReactDOM.createPortal(
        <S.ModalOverlay onClick={closeModal}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            <S.WarningIcon>⚠️</S.WarningIcon>
            <S.ModalTitle>
              Czy na pewno chcesz usunąć to zamówienie?
            </S.ModalTitle>

            <S.ModalDescription>
              Próbujesz usunąć zamówienie:{" "}
              <strong>{documentName || orderId}</strong>.<br />
              Ta operacja jest <strong>nieodwracalna</strong>.<br />
              Dane zostaną trwale usunięte z bazy danych.
            </S.ModalDescription>

            {/* Pole potwierdzenia ID */}
            <S.ConfirmInputContainer>
              <label>Aby potwierdzić usunięcie, wpisz ID zamówienia:</label>
              <S.ConfirmInput
                type="text"
                value={confirmInput}
                onChange={(e) => setConfirmInput(e.target.value)}
                placeholder="ID"
                autoFocus
              />
            </S.ConfirmInputContainer>

            <S.ButtonGroup>
              <S.CancelButton onClick={closeModal} disabled={isPending}>
                Anuluj
              </S.CancelButton>
              <S.ConfirmButton onClick={handleDelete} disabled={!canDelete}>
                {isPending ? "Usuwanie..." : "Tak, usuń trwale"}
              </S.ConfirmButton>
            </S.ButtonGroup>
          </S.ModalContent>
        </S.ModalOverlay>,
        document.getElementById("delete-order-modal") || document.body,
      )
    : null;

  return (
    <>
      {button}
      {modalContent}
    </>
  );
};

export default DeleteOrderModal;
