import { useParams } from "react-router-dom";
import { useOrders } from "../../api/useOrders";
import * as S from "./Styles";
const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order } = useOrders(id);
  const orderData = Array.isArray(order) ? order[0] : order;

  return (
    <>
      {orderData && (
        <S.PatientCard>
          <div className="status-row">
            <S.StatusBadge $status={orderData.status}>
              {orderData.status}
            </S.StatusBadge>
            <span className="date">
              {new Date(orderData.createdAt).toLocaleDateString()}
            </span>
          </div>
          {orderData.patientId && (
            <div className="id-section">
              <label>ID PACJENTA</label>
              <h2>{orderData.patientId}</h2>
            </div>
          )}

          <div className="doctor-section">
            <label>LEKARZ PROWADZĄCY</label>
            <p>{orderData.doctorName}</p>
          </div>
        </S.PatientCard>
      )}
    </>
  );
};

export default OrderDetails;
