import { useNavigate } from "react-router-dom";
import * as S from "./Styles";

interface DocumentPreviewProps {
  doc: {
    documentType: string;
    createdAt: string;
    _id:string;
  } | null;
}

const DocumentPreview = ({ doc }: DocumentPreviewProps) => {
  if (!doc) {
    return (
      <S.EmptyPreview>
        Wybierz dokument z listy, aby wyświetlić szczegóły
      </S.EmptyPreview>
    );
  }

  const DOCUMENT_TYPES: Record<string, string> = {
    "medical-event": "Zgłoszenie incydentu medycznego",
    "CyberboneOrderForm": "Formularz projektu Cyberbone",
    "NovaOssOrderForm": "Wytyczne NovaOss",
    "patient-consent": "Zgoda pacjenta na zabieg",
    invoice: "Faktura Pro-forma",
    default: "Dokumentacja medyczna",
  };

  const getDocTitle = (type: string) =>
    DOCUMENT_TYPES[type] || DOCUMENT_TYPES["default"];

  let navigate = useNavigate();

  const showDetails = () =>{
    navigate(`doc/${doc._id}`)
  }

  return (
    <S.PreviewContainer onClick={showDetails}>
      <S.PreviewHeader>
        <div>
          <S.Label>Typ dokumentu</S.Label>
          <h3>{getDocTitle(doc.documentType)}</h3>
        </div>
        <S.DateWrapper>
          <S.Label>Data utworzenia</S.Label>
          <span>{new Date(doc.createdAt).toLocaleString("pl-PL")}</span>
        </S.DateWrapper>
      </S.PreviewHeader>
    </S.PreviewContainer>
  );
};

export default DocumentPreview;
