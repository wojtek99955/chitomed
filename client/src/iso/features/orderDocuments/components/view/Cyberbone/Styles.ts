import styled from "styled-components";
import { device } from "../../../../../../assets/device";

// Kontener główny
export const PreviewWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.6;
  color: #1e293b;
`;

// Nagłówek sekcji z niebieskim borderem (taki sam jak w NovaOss i Formularzu)
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

// Siatka dla podstawowych informacji
export const GridSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
  }
`;

// Grupa informacyjna
export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const FullWidthGroup = styled(InfoGroup)`
  width: 100%;
`;

// Mała szara etykieta nad wartością
export const Label = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  margin-bottom: 6px;
  letter-spacing: 0.5px;
`;

// Wyświetlana wartość (imitacja inputa)
export const Value = styled.div<{ $highlight?: boolean }>`
  padding: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 15px;
  font-weight: ${(props) => (props.$highlight ? "700" : "500")};
  color: ${(props) => (props.$highlight ? "#2c50dc" : "#1e293b")};
`;

// Dłuższe opisy (przypadek medyczny, geometria)
export const LongText = styled.div`
  padding: 15px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
  color: #334155;
`;

// Linia oddzielająca sekcje
export const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #e2e8f0;
  margin: 25px 0;
`;

// Sekcja plików DICOM (jasnoniebieska)
export const FileSection = styled.div`
  margin-top: 20px;
  background: #f0f7ff;
  border: 1px solid #2c50dc;
  padding: 15px 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${Label} {
    color: #2c50dc;
  }
`;

// Przycisk pobierania
export const DownloadLink = styled.a`
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  color: #fff;
  background: #2c50dc;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 14px;
  width: fit-content;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

// Sekcja uwag (żółta, tak jak w NovaOss)
export const NotesSection = styled.div`
  margin-top: 25px;
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
