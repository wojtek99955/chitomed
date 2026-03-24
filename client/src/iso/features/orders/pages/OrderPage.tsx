import * as S from "./Styles";
import LinksDropdown from "../../Links/LinksDropdown";
import OrderDetails from "../components/OrderDetails/OrderDetails";
import OrderDocumentsList from "../../orderDocuments/components/OrderDocumentsList/OrderDocumentsList";

const OrderPage = () => {
  return (
    <>
      <S.OrderPageContainer>
        <S.BackBtn to="/iso/orders"><S.BackIcon/></S.BackBtn>
        <S.Wrapper>
          <OrderDetails />
          <LinksDropdown />
          <OrderDocumentsList />
        </S.Wrapper>
      </S.OrderPageContainer>
    </>
  );
};

export default OrderPage;
