import { useParams } from "react-router-dom";
import * as S from "./Styles";

const DocumentView = () => {
  const {id} = useParams();
  return (
    <S.Section>
      <S.BackBtn to={`/iso/orders/${id}`}>
        <S.BackIcon />
      </S.BackBtn>
    </S.Section>
  );
};

export default DocumentView;
