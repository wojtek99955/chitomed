import * as S from "./Styles";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

interface MedicalEventPreviewProps {
  data: any; // Używamy any dla uproszczenia przy tak dużej liczbie pól
}

const MedicalEventPreview = ({ data }: MedicalEventPreviewProps) => {
  const formatDate = (dateStr: string) =>
    dateStr ? format(new Date(dateStr), "d MMMM yyyy", { locale: pl }) : "—";

  return (
    <S.PreviewWrapper>
      {/* SEKCJA 1: IDENTYFIKACJA PRODUKTU */}
      <S.SectionTitle>1. Informacje o wyrobie</S.SectionTitle>
      <S.GridSection>
        <S.InfoGroup>
          <S.Label>Nazwa produktu</S.Label>
          <S.Value $highlight>{data.productName}</S.Value>
        </S.InfoGroup>
        <S.InfoGroup>
          <S.Label>Numer modelu / Ref</S.Label>
          <S.Value>{data.modelNumber}</S.Value>
        </S.InfoGroup>
        <S.InfoGroup>
          <S.Label>Data produkcji</S.Label>
          <S.Value>{formatDate(data.prodDate)}</S.Value>
        </S.InfoGroup>
        <S.InfoGroup>
          <S.Label>Data ważności</S.Label>
          <S.Value>{formatDate(data.expiryDate)}</S.Value>
        </S.InfoGroup>
      </S.GridSection>

      {/* SEKCJA 2: DANE PACJENTA */}
      <S.SectionTitle>2. Informacje o pacjencie</S.SectionTitle>
      <S.ThreeColumns>
        <S.InfoGroup>
          <S.Label>Wiek</S.Label>
          <S.Value>{data.patientAge} lat</S.Value>
        </S.InfoGroup>
        <S.InfoGroup>
          <S.Label>Płeć</S.Label>
          <S.Value>
            {data.patientGender === "M" ? "Mężczyzna" : "Kobieta"}
          </S.Value>
        </S.InfoGroup>
        <S.InfoGroup>
          <S.Label>Waga</S.Label>
          <S.Value>{data.patientWeight} kg</S.Value>
        </S.InfoGroup>
      </S.ThreeColumns>

      <S.Divider />

      {/* SEKCJA 3: SZCZEGÓŁY INCYDENTU */}
      <S.SectionTitle>3. Opis Incydentu / Zdarzenia</S.SectionTitle>
      <S.GridSection>
        <S.InfoGroup>
          <S.Label>Data incydentu</S.Label>
          <S.Value $highlight>{formatDate(data.incidentDate)}</S.Value>
        </S.InfoGroup>
        <S.InfoGroup>
          <S.Label>Miejsce zdarzenia</S.Label>
          <S.Value>{data.incidentLocation}</S.Value>
        </S.InfoGroup>
      </S.GridSection>

      <S.FullWidthGroup>
        <S.Label>Opis przebiegu zdarzenia</S.Label>
        <S.LongText $isIncident>{data.incidentDescription}</S.LongText>
      </S.FullWidthGroup>

      <S.FullWidthGroup>
        <S.Label>Stan pacjenta / Skutki (Outcome)</S.Label>
        <S.LongText>{data.patientOutcome}</S.LongText>
      </S.FullWidthGroup>

      {/* SEKCJA 4: LINIA CZASU IMPLANTU */}
      <S.SectionTitle>4. Chronologia kliniczna</S.SectionTitle>
      <S.ThreeColumns>
        <S.InfoGroup>
          <S.Label>Data implantacji</S.Label>
          <S.Value>{formatDate(data.implantDate)}</S.Value>
        </S.InfoGroup>
        <S.InfoGroup>
          <S.Label>Data usunięcia (jeśli dotyczy)</S.Label>
          <S.Value>{formatDate(data.removalDate)}</S.Value>
        </S.InfoGroup>
        <S.InfoGroup>
          <S.Label>Czas trwania</S.Label>
          <S.Value>{data.duration || "—"}</S.Value>
        </S.InfoGroup>
      </S.ThreeColumns>

      {/* SEKCJA 5: DANE ZGŁASZAJĄCEGO */}
      <S.SectionTitle>5. Dane zgłaszającego i kontaktowe</S.SectionTitle>
      <S.GridSection>
        <S.InfoGroup>
          <S.Label>Osoba kontaktowa</S.Label>
          <S.Value>{data.contactPerson}</S.Value>
        </S.InfoGroup>
        <S.InfoGroup>
          <S.Label>Status zgłaszającego</S.Label>
          <S.Value>
            {data.reporterStatus} ({data.userType})
          </S.Value>
        </S.InfoGroup>
        <S.InfoGroup>
          <S.Label>Email</S.Label>
          <S.Value>{data.email}</S.Value>
        </S.InfoGroup>
        <S.InfoGroup>
          <S.Label>Adres</S.Label>
          <S.Value>{`${data.reporterAddress}, ${data.postalCode} ${data.city}`}</S.Value>
        </S.InfoGroup>
      </S.GridSection>

      {data.notes && (
        <S.NotesSection>
          <S.Label>Dodatkowe notatki</S.Label>
          <S.LongText>{data.notes}</S.LongText>
        </S.NotesSection>
      )}

      {data.declaration && (
        <S.DeclarationBox>
          ✅ Zgłaszający potwierdza prawdziwość danych (Oświadczenie
          zaakceptowane)
        </S.DeclarationBox>
      )}
    </S.PreviewWrapper>
  );
};

export default MedicalEventPreview;
