import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Styles";
import DeleteDocumentModal from "../DeleteDocumentModal/DeleteDocumentModal";

interface DocumentPreviewProps {
  doc: {
    documentType: string;
    createdAt: string;
    _id: string;
    data: {
        displayName: string;
        originalName: string;
    };
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
    CyberBoneOrderForm: "Formularz projektu Cyberbone",
    NovaOssOrderForm: "Wytyczne NovaOss",
    "patient-consent": "Zgoda pacjenta na zabieg",
    invoice: "Faktura Pro-forma",
    "3Dproject": "Projekt 3D",
    default: "Dokumentacja medyczna",
  };
  
  const getDocTitle = () => {
    if (doc.data?.displayName) return doc.data.displayName;
    return DOCUMENT_TYPES[doc.documentType] || DOCUMENT_TYPES["default"];
  };

  const showDetails = () => {
    navigate(`doc/${doc._id}`);
  };

  // 2. Funkcja otwierająca modal (z e.stopPropagation!)
  const openDeleteModal = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ważne: zapobiega nawigacji do detali
    setModalData({
      isOpen: true,
      id: doc._id,
      name: getDocTitle(),
    });
  };

  const formattedDate = new Date(doc.createdAt).toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const getDocumentIcon = (docType: string) => {
  switch (docType) {
    case "CyberBoneOrderForm":
      return <S.DocumentIcon />;
    case "OrderAttachment":
      return <S.DocumentIcon />;
    case "NovaOssOrderForm":
      return <S.DocumentIcon />;
    case "3Dproject":
      return <S.ThreeDIcon />;
    case "medical-event":
      return <S.IncidentIcon />;
    default:
      return <S.DocumentIcon />;
  }
};
  return (
    <>
      <S.PreviewContainer onClick={showDetails}>
        <S.PreviewHeader>
          <S.Icon>{getDocumentIcon(doc.documentType)}</S.Icon>
          <S.Wrapper>
            <div>
              <S.Label>Typ dokumentu</S.Label>
              <h3>{getDocTitle()}</h3>
            </div>

            <S.RightSide>
              <S.DateWrapper>
                <S.Label>Data</S.Label>
                <span>{formattedDate}</span>
              </S.DateWrapper>

              {/* 3. Przycisk usuwania */}
              <S.DeleteIconButton
                onClick={openDeleteModal}
                title="Usuń dokument">
                <S.DeleteIcon />
              </S.DeleteIconButton>
            </S.RightSide>
          </S.Wrapper>
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
