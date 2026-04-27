import OrdersLinksDropdown from "../../features/Links/OrdersLinksDropdown";
import { useOrders } from "../../features/orders/api/useOrders";
import OrderPreview from "../../features/orders/components/OrderPreview/OrderPreview";
import * as S from "./Styles";
const ISOOrders = () => {
  const { data: allOrders, isLoading, isError } = useOrders();

  if (isLoading) return <div>Ładowanie zamówień...</div>;
  if (isError)
    return <div>Błąd pobierania danych. Sprawdź połączenie z serwerem.</div>;
  const ordersList = Array.isArray(allOrders) ? allOrders : [];
  return (
    <S.PageContainer>
      <OrdersLinksDropdown />
      <S.OrdersGrid>
        {Array.isArray(allOrders) &&
          allOrders.map((order: any) => <OrderPreview order={order} />)}

        {ordersList?.length === 0 && <p>Brak aktywnych zamówień.</p>}
      </S.OrdersGrid>
    </S.PageContainer>
  );
};

export default ISOOrders;
