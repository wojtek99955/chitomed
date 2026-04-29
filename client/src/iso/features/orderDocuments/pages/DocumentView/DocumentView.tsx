import { useParams } from "react-router-dom";
import * as S from "./Styles";
import { useOrderDocuments } from "../../api/useOrderDocuments";
import CyberbonePreview from "../../components/view/Cyberbone/CyberboneView";
import NovaOssPreview from "../../components/view/NovaOss/NovaOssPreview";
import { format } from "date-fns";
import { pl } from "date-fns/locale"; 
import MedicalEventPreview from "../../components/view/MedicalEventPreview/MedicalEventPreview";
import Project3D from "../../components/view/Project3D/Project3D";
const DocumentView = () => {
  const { id, docId } = useParams<{ id: string; docId: string }>();
  const { data: docs, isLoading } = useOrderDocuments(id);

  // Znajdujemy konkretny dokument po ID z URL
  const currentDoc = docs?.find((doc) => doc._id === docId);

  if (isLoading) return <S.Section>Ładowanie dokumentu...</S.Section>;
  if (!currentDoc) return <S.Section>Nie znaleziono dokumentu.</S.Section>;

  // Funkcja renderująca odpowiedni formularz
  const renderDocument = () => {
    switch (currentDoc.documentType) {
      case "CyberboneOrderForm":
        return <CyberbonePreview data={currentDoc.data} />;
      case "NovaOssOrderForm":
        return <NovaOssPreview data={currentDoc.data} />;
      case "medical-event":
        return <MedicalEventPreview data={currentDoc.data} />;
      case "3Dproject":
        return <Project3D data={currentDoc.data} />;
      default:
        return (
          <S.UnknownDoc>
            <h3>Nieznany typ dokumentu: {currentDoc.documentType}</h3>
            <pre>{JSON.stringify(currentDoc.data, null, 2)}</pre>
          </S.UnknownDoc>
        );
    }
  };

  return (
    <S.Section>
      <S.Header>
        <S.BackBtn to={`/iso/orders/${id}`}>
          <S.BackIcon />
        </S.BackBtn>
      </S.Header>

      <S.ContentCard>{renderDocument()}</S.ContentCard>
      {/* <S.DocBadge $type={currentDoc.documentType}>
        {currentDoc.documentType}
      </S.DocBadge> */}
      <S.Date>
        {currentDoc?.createdAt &&
          format(new Date(currentDoc.createdAt), "d MMMM yyyy, HH:mm", {
            locale: pl,
          })}
      </S.Date>
    </S.Section>
  );
};

export default DocumentView;
