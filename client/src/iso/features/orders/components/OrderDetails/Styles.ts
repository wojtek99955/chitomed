import styled from "styled-components";

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
