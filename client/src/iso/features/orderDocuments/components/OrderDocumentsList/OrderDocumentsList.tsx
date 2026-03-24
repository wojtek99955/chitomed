import { useParams } from "react-router-dom";
import { useOrderDocuments } from "../../api/useOrderDocuments";
import * as S from "./Styles";
import DocumentPreview from "../DocumentPreview/DocumentPreview";
const OrderDocumentsList = () => {
  const { id } = useParams<{ id: string }>();
  const { data: docs, isLoading, isError } = useOrderDocuments(id);

  if (isLoading) return <div>Ładowanie dokumentacji...</div>;
  if (isError) return <div>Nie udało się pobrać dokumentów zamówienia.</div>;
  return (
    <>
      <S.Title>Dokumenty</S.Title>
      {docs && docs.length > 0 ? (
        <S.List>
          {docs.map((doc) => (
            <DocumentPreview doc={doc} />
          ))}
        </S.List>
      ) : (
        <div>Brak przypisanych dokumentów do tego zamówienia.</div>
      )}
    </>
  );
};

export default OrderDocumentsList;
