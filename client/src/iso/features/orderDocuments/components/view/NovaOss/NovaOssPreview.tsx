import * as S from "./Styles";

// --- Types ---

interface OrderLine {
  volumeMl: string | number;
  count: number;
  chitosanMatrix: string | number;
  fillerType: string;
  fillerPercent: string | number;
  density: string;
}

interface NovaOssPreviewProps {
  data: {
    creationDate: string;
    doctorName: string;
    facilityData: string;
    phone: string;
    doctorEmail?: string;
    orderLines: OrderLine[];
    additionalNotes?: string;
  };
}

// --- Component ---

const NovaOssPreview = ({ data }: NovaOssPreviewProps) => {
  // Zabezpieczenie na wypadek braku danych lub starego formatu
  const lines = data.orderLines || [];

  return (
    <S.PreviewWrapper>
      {/* SEKCJA 1: DANE ORAZ KONTAKT */}
      <S.SectionTitle>1. Dane zamawiającego i placówki</S.SectionTitle>
      <S.GridSection>
        <S.InfoGroup>
          <S.Label>Data utworzenia</S.Label>
          <S.Value>{data.creationDate}</S.Value>
        </S.InfoGroup>
        <S.InfoGroup>
          <S.Label>Lekarz prowadzący</S.Label>
          <S.Value>{data.doctorName}</S.Value>
        </S.InfoGroup>
        <S.InfoGroup>
          <S.Label>Email</S.Label>
          <S.Value>{data.doctorEmail || "Nie podano"}</S.Value>
        </S.InfoGroup>
        <S.InfoGroup>
          <S.Label>Telefon</S.Label>
          <S.Value>{data.phone}</S.Value>
        </S.InfoGroup>
      </S.GridSection>

      <S.FullWidthGroup style={{ marginTop: "10px" }}>
        <S.Label>Miejsce zabiegu</S.Label>
        <S.Value>{data.facilityData}</S.Value>
      </S.FullWidthGroup>

      <S.Divider />

      {/* SEKCJA 2: LISTA POZYCJI ZAMÓWIENIA */}
      <S.SectionTitle>2. Specyfikacja pozycji zamówienia</S.SectionTitle>

      {lines.length === 0 ? (
        <S.Value>Brak zdefiniowanych pozycji zamówienia.</S.Value>
      ) : (
        lines.map((line, index) => {
          const chitosan = Number(line.chitosanMatrix) || 0;
          const filler = Number(line.fillerPercent) || 0;
          const totalPercent = chitosan + filler;

          return (
            <div
              key={index}
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px",
                backgroundColor: "#ffffff",
              }}>
              <h4
                style={{
                  margin: "0 0 12px 0",
                  color: "#6c5ce7",
                  fontSize: "14px",
                }}>
                POZYCJA #{index + 1}
              </h4>

              <S.GridSection>
                <S.InfoGroup>
                  <S.Label>Objętość (ml)</S.Label>
                  <S.Value>{line.volumeMl} ml</S.Value>
                </S.InfoGroup>
                <S.InfoGroup>
                  <S.Label>Liczba sztuk</S.Label>
                  <S.Value>{line.count} szt.</S.Value>
                </S.InfoGroup>
                <S.InfoGroup>
                  <S.Label>Matryca Chitozanowa</S.Label>
                  <S.Value>{chitosan}%</S.Value>
                </S.InfoGroup>
                <S.InfoGroup>
                  <S.Label>Napełniacz</S.Label>
                  <S.Value>
                    {filler}% ({line.fillerType})
                  </S.Value>
                </S.InfoGroup>
                <S.InfoGroup>
                  <S.Label>Gęstość wyrobu</S.Label>
                  <S.Value>{line.density}</S.Value>
                </S.InfoGroup>
              </S.GridSection>

              {totalPercent !== 100 && (
                <S.WarningBox
                  style={{ marginTop: "12px", borderLeft: "4px solid orange" }}>
                  ⚠️ Uwaga: Suma składników (matryca + napełniacz) wynosi{" "}
                  {totalPercent}%
                </S.WarningBox>
              )}
            </div>
          );
        })
      )}

      {/* SEKCJA 3: UWAGI */}
      {data.additionalNotes && (
        <>
          <S.Divider />
          <S.NotesSection>
            <S.Label>Dodatkowe uwagi do produkcji</S.Label>
            <S.LongText>{data.additionalNotes}</S.LongText>
          </S.NotesSection>
        </>
      )}

      {/* STOPKA INFORMACYJNA */}
      <div
        style={{
          marginTop: "30px",
          fontSize: "10px",
          color: "#999",
          fontStyle: "italic",
        }}>
        Dokument wygenerowany automatycznie na podstawie wytycznych klinicznych
        NovaOss.
      </div>
    </S.PreviewWrapper>
  );
};

export default NovaOssPreview;
