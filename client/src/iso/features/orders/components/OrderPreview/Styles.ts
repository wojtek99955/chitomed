// Styles.js
import styled from "styled-components";
import { device } from "../../../../../assets/device";

export const PageContainer = styled.div`
  gap: 1rem;
  width: 100%;
  min-height: 100vh;
  position: relative;
  top: 8rem;
  padding: 1rem;

  @media ${device.laptop} {
    top: 10rem;
    flex-direction: row;
    width: calc(100% - 15rem);
    left: 15rem;
    width: calc(100% - 15rem);
    left: 15rem;
  }
`;

export const OrdersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

export const OrderBox = styled.div<any>`
  background: white;
  border-radius: 12px;
  padding: 25px 20px;
  position: relative;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s;
  border: 1px solid #e9eaed;
  border-left: none;
  overflow: hidden;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const StatusBar = styled.div<any>`
  width: 0.4rem;
  z-index: 1;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: ${(props) => getStatusColor(props.$status)};
`;

export const StatusBadge = styled.span<any>`
  font-size: 10px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  background: ${(props) => getStatusColor(props.$status)}22;
  color: ${(props) => getStatusColor(props.$status)};
`;

// Helper dla kolorów ISO
const getStatusColor = (status: string) => {
  switch (status) {
    case "nowe":
      return "#2D50DC"; // Niebieski
    case "produkcja":
      return "#f1c40f"; // Żółty
    case "zakończone":
      return "#2ecc71"; // Zielony
    case "incydent":
      return "#e74c3c"; // Czerwony
    default:
      return "#95a5a6";
  }
};
// Styles.js (kontynuacja)

export const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;

  .order-number {
    font-weight: 800;
    color: #2c3e50;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
  }
`;

export const OrderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .info-row {
    font-size: 0.85rem;
    color: #7f8c8d;

    strong {
      color: #34495e;
      font-weight: 600;
      margin-right: 5px;
    }
  }
`;

export const OrderFooter = styled.div`
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px dashed #eee;
  display: flex;
  justify-content: flex-end;

  span {
    font-size: 0.75rem;
    color: #2d50dc;
    font-weight: 500;
    transition: color 0.2s;
  }

  ${OrderBox}:hover & span {
    color: #2980b9;
    text-decoration: underline;
  }
`;

// Opcjonalnie: Kontener nagłówka strony
export const HeaderSection = styled.div`
  margin-bottom: 30px;

  h1 {
    font-size: 1.8rem;
    color: #2c3e50;
    margin-bottom: 5px;
  }

  p {
    color: #95a5a6;
    font-size: 0.9rem;
  }
`;

export const Wrapper = styled.div`
  display: flex;
`;
