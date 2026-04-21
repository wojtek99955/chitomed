import { useDeleteOrderDocument } from "../../api/useDeleteDocument";
import * as S from "./Styles"; // Załóżmy, że tu trzymasz style modalu

interface DeleteDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  documentName?: string;
}

const DeleteDocumentModal = ({
  isOpen,
  onClose,
  orderId,
  documentName,
}: DeleteDocumentModalProps) => {
  const { mutate: deleteDoc, isPending } = useDeleteOrderDocument();

  if (!isOpen) return null;

  const handleDelete = () => {
    deleteDoc(orderId, {
      onSuccess: () => {
        onClose();
        // Opcjonalnie: Toast zamiast alertu
      },
      onError: (err) => {
        alert("Błąd podczas usuwania: " + err.message);
      },
    });
  };

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.WarningIcon>⚠️</S.WarningIcon>
        <S.ModalTitle>Czy na pewno chcesz usunąć dokument?</S.ModalTitle>
        <S.ModalDescription>
          Próbujesz usunąć: <strong>{documentName || orderId}</strong>.
          <br />
          Ta operacja jest <strong>nieodwracalna</strong>. Dane zostaną trwale
          usunięte z bazy danych Syntplant.
        </S.ModalDescription>

        <S.ButtonGroup>
          <S.CancelButton onClick={onClose} disabled={isPending}>
            Anuluj
          </S.CancelButton>
          <S.ConfirmButton onClick={handleDelete} disabled={isPending}>
            {isPending ? "Usuwanie..." : "Tak, usuń trwale"}
          </S.ConfirmButton>
        </S.ButtonGroup>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default DeleteDocumentModal;
