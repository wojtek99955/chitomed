import { useNavigate } from "react-router-dom";
import * as S from "./Styles";
import DeleteOrderModal from "../../../orderDocuments/components/DeleteOrderModal/DeleteOrderModal";

const OrderPreview = ({ order }: any) => {
  let navigate = useNavigate();
  return (
    <>
      <S.OrderBox
        key={order._id}
        onClick={() => navigate(`/iso/orders/${order._id}`)}>
        <S.StatusBar $status={order.status} />
        <S.OrderHeader>
          <span className="order-number">ID: {order._id || "BRAK NR"}</span>
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
        <DeleteOrderModal orderId={order._id} documentName={order._id} />
      </S.OrderBox>
    </>
  );
};

export default OrderPreview;
