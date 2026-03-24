import OrdersLinksDropdown from "../../features/Links/OrdersLinksDropdown";
import { useOrders } from "../../features/orders/api/useOrders";
import * as S from "./Styles"; // Załóżmy, że tu masz styled-components
import { useNavigate } from "react-router-dom";

const ISOOrders = () => {
  const { data: allOrders, isLoading, isError } = useOrders();
  const navigate = useNavigate();

  if (isLoading) return <div>Ładowanie zamówień...</div>;
  if (isError)
    return <div>Błąd pobierania danych. Sprawdź połączenie z serwerem.</div>;
const ordersList = Array.isArray(allOrders) ? allOrders : [];
  return (
    <S.PageContainer>
      <OrdersLinksDropdown />
      <S.OrdersGrid>
        {Array.isArray(allOrders) &&
          allOrders.map((order: any) => (
            <S.OrderBox
              key={order._id}
              onClick={() => navigate(`/iso/orders/${order._id}`)}>
              <S.StatusBar $status={order.status} />
              <S.OrderHeader>
                <span className="order-number">
                  ID: {order._id || "BRAK NR"}
                </span>
                <S.StatusBadge $status={order.status}>
                  {order.status.toUpperCase()}
                </S.StatusBadge>
              </S.OrderHeader>

              <S.OrderContent>
                {order.patientId && (
                  <div className="info-row">
                    <strong>Pacjent:</strong> {order.patientId}
                  </div>
                )}
                <div className="info-row">
                  <strong>Lekarz:</strong> {order.doctorName}
                </div>
                <div className="info-row">
                  <strong>Data:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </S.OrderContent>

              <S.OrderFooter>
                <span>Kliknij, aby zobaczyć szczegóły →</span>
              </S.OrderFooter>
            </S.OrderBox>
          ))}

        {ordersList?.length === 0 && <p>Brak aktywnych zamówień.</p>}
      </S.OrdersGrid>
    </S.PageContainer>
  );
};

export default ISOOrders;
