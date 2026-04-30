import * as S from "./Styles";

interface CyberbonePreviewProps {
  data: {
    creationDate: string;
    doctorName: string;
    facilityDetails: string;
    phone: string;
    doctorEmail?: string;
    surgeryDate: string;
    patientId: string;
    medicalCase: string;
    geometryDescription: string;
    dicomUrl?: string;
    additionalNotes?: string;
  };
}

const CyberbonePreview = ({ data }: CyberbonePreviewProps) => {
  return (
    <S.PreviewWrapper>
      <S.GridSection>
        <S.InfoGroup>
          <S.Label>Pacjent (ID)</S.Label>
          <S.Value $highlight>{data.patientId}</S.Value>
        </S.InfoGroup>
        <S.InfoGroup>
          <S.Label>Planowana data zabiegu</S.Label>
          <S.Value>
            {new Date(data.surgeryDate).toLocaleDateString("pl-PL")}
          </S.Value>
        </S.InfoGroup>
      </S.GridSection>

      <S.Divider />

      <S.SectionTitle>Dane kontaktowe i placówka</S.SectionTitle>
      <S.GridSection>
        <S.InfoGroup>
          <S.Label>Lekarz prowadzący</S.Label>
          <S.Value>{data.doctorName}</S.Value>
        </S.InfoGroup>
        <S.InfoGroup>
          <S.Label>Placówka</S.Label>
          <S.Value>{data.facilityDetails}</S.Value>
        </S.InfoGroup>
      </S.GridSection>

      <S.Divider />

      <S.SectionTitle>Wytyczne kliniczne</S.SectionTitle>
      <S.FullWidthGroup>
        <S.Label>Opis przypadku medycznego</S.Label>
        <S.LongText>{data.medicalCase}</S.LongText>
      </S.FullWidthGroup>

      <S.FullWidthGroup>
        <S.Label>Sugerowana geometria i fiksacja</S.Label>
        <S.LongText>{data.geometryDescription}</S.LongText>
      </S.FullWidthGroup>

      <S.Divider />

      {data.dicomUrl && (
        <S.FileSection>
          <S.Label>Dane obrazowe</S.Label>
          <S.DownloadLink href={data.dicomUrl} target="_blank">
            📥 Pobierz plik z badaniem
          </S.DownloadLink>
        </S.FileSection>
      )}

      {data.additionalNotes && (
        <S.NotesSection>
          <S.Label>Dodatkowe uwagi</S.Label>
          <S.LongText>{data.additionalNotes}</S.LongText>
        </S.NotesSection>
      )}
    </S.PreviewWrapper>
  );
};

export default CyberbonePreview;
