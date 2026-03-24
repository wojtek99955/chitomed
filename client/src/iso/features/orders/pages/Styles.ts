import styled from "styled-components";
import { device } from "../../../../assets/device";
import { Link } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";

export const OrderPageContainer = styled.div`
  gap: 1rem;
  width: 100%;
  display: flex;
  position: relative;
  top: 10rem;
  padding: 1rem;

  @media ${device.laptop} {
    flex-direction: row;
    width: calc(100% - 15rem);
    left: 15rem;
    width: calc(100% - 15rem);
    left: 15rem;
  }
`;

export const Sidebar = styled.div`
  width: 320px;
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

export const SidebarTitle = styled.h3`
  font-size: 1.1rem;
  color: #1e293b;
  margin-bottom: 20px;
  border-bottom: 2px solid #2d50dc;
  padding-bottom: 10px;
`;

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
`;

export const HistoryItem = styled.div<{ $active: boolean }>`
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  background: ${(props) => (props.$active ? "#eff6ff" : "#f1f5f9")};
  border: 1px solid ${(props) => (props.$active ? "#3b82f6" : "transparent")};
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
  }

  .version-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    margin-bottom: 4px;
    strong {
      color: #1e293b;
    }
    span {
      color: #64748b;
    }
  }

  .type-tag {
    font-size: 0.75rem;
    font-weight: 600;
    color: #3b82f6;
    text-transform: uppercase;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 40px;
  overflow-y: auto;
`;

export const DetailsCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 32px;
`;

export const DetailsHeader = styled.div`
  margin-bottom: 30px;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 20px;
  h2 {
    color: #0f172a;
    margin-bottom: 4px;
  }
  p {
    color: #94a3b8;
    font-size: 0.85rem;
  }
`;

export const InfoSection = styled.div`
  margin-bottom: 24px;
  h3 {
    font-size: 0.95rem;
    color: #64748b;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  p {
    color: #334155;
    line-height: 1.6;
    white-space: pre-wrap;
    background: #f8fafc;
    padding: 15px;
    border-radius: 6px;
  }
`;

export const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #f1f5f9;
  font-size: 0.9rem;
  color: #475569;
`;

export const Placeholder = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  .icon {
    font-size: 4rem;
    margin-bottom: 16px;
  }
`;

export const Loading = styled.div`
  padding: 40px;
  text-align: center;
  color: #64748b;
`;

export const PatientHeader = styled.div`
  background: #f1f5f9;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid #e2e8f0;

  .patient-id-badge {
    background: #1e293b;
    color: white;
    font-size: 0.8rem;
    font-weight: 800;
    padding: 6px 12px;
    border-radius: 6px;
    display: inline-block;
    margin-bottom: 12px;
    letter-spacing: 1px;
  }

  .doctor-info {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .label {
      font-size: 0.7rem;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 600;
    }

    .name {
      font-size: 1rem;
      color: #0f172a;
      font-weight: 700;
    }
  }
`;

export const PatientCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;

  .status-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    .date {
      font-size: 0.75rem;
      color: #94a3b8;
      font-weight: 500;
    }
  }

  label {
    display: block;
    font-size: 0.65rem;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 4px;
  }

  .id-section {
    margin-bottom: 12px;
    h2 {
      font-size: 1.3rem;
      color: #1e293b;
      margin: 0;
      letter-spacing: -0.02em;
    }
  }

  .doctor-section {
    p {
      font-size: 1rem;
      font-weight: 600;
      color: #334155;
      margin: 0;
    }
  }
`;

export const StatusBadge = styled.span<{ $status: string }>`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  background: ${(props) => {
    switch (props.$status) {
      case "nowe":
        return "#e0f2fe";
      case "produkcja":
        return "#fef3c7";
      case "zakończone":
        return "#dcfce7";
      default:
        return "#f1f5f9";
    }
  }};
  color: ${(props) => {
    switch (props.$status) {
      case "nowe":
        return "#0369a1";
      case "produkcja":
        return "#b45309";
      case "zakończone":
        return "#15803d";
      default:
        return "#475569";
    }
  }};
`;

export const Wrapper = styled.div`
width: 100%;
`;

export const BackBtn = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: fit-content;
  padding: 0.7rem 1.5rem;
  color: white;
  background-color: #d6dcf8;
  background-color: #2c50dc;
  border: none;
  border-radius: 33px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid #2c50dc;
  transition: all 0.2s;
  margin-bottom: 2rem;
  color: #000;
  color: white;
  text-decoration: none;

  &:hover {
    background: #2c50dc;
    color: white;
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1.01);
  }
`;

export const BackIcon = styled(IoChevronBackOutline)`
font-size: 1.4rem;
color:white;
`;