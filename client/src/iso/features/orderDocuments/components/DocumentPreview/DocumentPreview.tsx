import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Styles";
import DeleteDocumentModal from "../DeleteDocumentModal/DeleteDocumentModal";

interface DocumentPreviewProps {
  doc: {
    documentType: string;
    createdAt: string;
    _id: string;
  } | null;
}

const DocumentPreview = ({ doc }: DocumentPreviewProps) => {
  const navigate = useNavigate();

  // 1. Dodajemy stan dla modalu
  const [modalData, setModalData] = useState({
    isOpen: false,
    id: "",
    name: "",
  });

  if (!doc) {
    return (
      <S.EmptyPreview>
        Wybierz dokument z listy, aby wyświetlić szczegóły
      </S.EmptyPreview>
    );
  }

  const DOCUMENT_TYPES: Record<string, string> = {
    "medical-event": "Zgłoszenie incydentu medycznego",
    CyberboneOrderForm: "Formularz projektu Cyberbone",
    NovaOssOrderForm: "Wytyczne NovaOss",
    "patient-consent": "Zgoda pacjenta na zabieg",
    invoice: "Faktura Pro-forma",
    "3Dproject": "Projekt 3D",
    default: "Dokumentacja medyczna",
  };

  const getDocTitle = (type: string) =>
    DOCUMENT_TYPES[type] || DOCUMENT_TYPES["default"];

  const showDetails = () => {
    navigate(`doc/${doc._id}`);
  };

  // 2. Funkcja otwierająca modal (z e.stopPropagation!)
  const openDeleteModal = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ważne: zapobiega nawigacji do detali
    setModalData({
      isOpen: true,
      id: doc._id,
      name: getDocTitle(doc.documentType),
    });
  };

  return (
    <>
      <S.PreviewContainer onClick={showDetails}>
        <S.PreviewHeader>
          <div>
            <S.Label>Typ dokumentu</S.Label>
            <h3>{getDocTitle(doc.documentType)}</h3>
          </div>

          <S.RightSide>
            <S.DateWrapper>
              <S.Label>Data utworzenia</S.Label>
              <span>{new Date(doc.createdAt).toLocaleString("pl-PL")}</span>
            </S.DateWrapper>

            {/* 3. Przycisk usuwania */}
            <S.DeleteIconButton onClick={openDeleteModal} title="Usuń dokument">
             <S.DeleteIcon/>
            </S.DeleteIconButton>
          </S.RightSide>
        </S.PreviewHeader>
      </S.PreviewContainer>

      {/* 4. Modal usuwania */}
      <DeleteDocumentModal
        isOpen={modalData.isOpen}
        orderId={modalData.id}
        documentName={modalData.name}
        onClose={() => setModalData({ ...modalData, isOpen: false })}
      />
    </>
  );
};

export default DocumentPreview;
