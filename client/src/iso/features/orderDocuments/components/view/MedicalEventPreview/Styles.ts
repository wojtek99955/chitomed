import styled from "styled-components";
import { device } from "../../../../../../assets/device";

export const EventHeader = styled.div<{ $isUrgent?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: ${(props) => (props.$isUrgent ? "#fff1f2" : "#f8fafc")};
  border: 1px solid ${(props) => (props.$isUrgent ? "#fecdd3" : "#e2e8f0")};
  border-radius: 8px;
  margin-bottom: 25px;

  .status strong {
    color: ${(props) => (props.$isUrgent ? "#e11d48" : "#1e293b")};
    font-size: 18px;
  }
`;

export const LongText = styled.div<{ $isIncident?: boolean }>`
  padding: 15px;
  background: ${(props) => (props.$isIncident ? "#fff" : "#f8fafc")};
  border: 1px solid #e2e8f0;
  border-left: ${(props) =>
    props.$isIncident ? "4px solid #e11d48" : "1px solid #e2e8f0"};
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
`;

// Ponownie wykorzystujemy SectionTitle, Label, Value i GridSection z poprzednich stylów
export const PreviewWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.6;
  color: #1e293b;
`;

// Niebieski nagłówek sekcji (zgodny z Formularzem)
export const SectionTitle = styled.h2`
  background: #f4f7f9;
  padding: 10px 15px;
  font-size: 16px;
  border-left: 5px solid #2c50dc;
  margin: 25px 0 15px 0;
  color: #1a202c;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 700;
`;

// Układ siatki dla pól danych
export const GridSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
  }
`;

// Grupa informacyjna (Label + Dane)
export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const FullWidthGroup = styled(InfoGroup)`
  width: 100%;
`;

// Etykieta (mała, pogrubiona, szara)
export const Label = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  margin-bottom: 6px;
  letter-spacing: 0.5px;
`;


// Linia oddzielająca
export const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #e2e8f0;
  margin: 25px 0;
`;

// Sekcja uwag (styl "Notatka")
export const NotesSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #fffbeb;
  border: 1px solid #fef3c7;
  border-radius: 8px;

  ${Label} {
    color: #92400e;
    display: block;
    margin-bottom: 10px;
  }
`;

// Grid dla kafelków objętości
export const VolumeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 15px;
  margin-top: 10px;
`;

// Kafelek z objętością (np. 1ml - 2szt)
export const VolumeCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background: #fff;
  border: 2px solid #2c50dc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(44, 80, 220, 0.08);

  .size {
    font-size: 12px;
    font-weight: 700;
    color: #2c50dc;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .count {
    font-size: 18px;
    font-weight: 800;
    color: #1e293b;
  }
`;

// Box ostrzegawczy (np. błąd sumy %)
export const WarningBox = styled.div`
  background: #fff5f5;
  border: 1px solid #feb2b2;
  padding: 12px 15px;
  margin: 15px 0;
  border-radius: 6px;
  color: #c53030;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const ThreeColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 15px;
  margin-bottom: 20px;
  @media ${device.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const DeclarationBox = styled.div`
  margin-top: 30px;
  padding: 15px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #166534;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
`;

// Upewnij się, że masz ten Value z highlightem, o którym rozmawialiśmy
export const Value = styled.div<{ $highlight?: boolean }>`
  padding: 12px;
  background: ${(props) => (props.$highlight ? "#f0f4ff" : "#f8fafc")};
  border: 1px solid ${(props) => (props.$highlight ? "#2c50dc" : "#e2e8f0")};
  border-radius: 6px;
  font-size: 15px;
  font-weight: ${(props) => (props.$highlight ? "700" : "500")};
  color: ${(props) => (props.$highlight ? "#2c50dc" : "#1e293b")};
`;