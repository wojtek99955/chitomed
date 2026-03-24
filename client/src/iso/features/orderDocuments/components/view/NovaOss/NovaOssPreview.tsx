import * as S from "./Styles";

interface NovaOssPreviewProps {
  data: {
    creationDate: string;
    doctorName: string;
    facilityData: string;
    phone: string;
    doctorEmail?: string;
    chitosanMatrix: number;
    fillerType: string;
    fillerPercent: number;
    density: string;
    volumes: {
      v1ml?: number;
      v2ml?: number;
      v4ml?: number;
      v5ml?: number;
      v10ml?: number;
    };
    additionalNotes?: string;
  };
}

const NovaOssPreview = ({ data }: NovaOssPreviewProps) => {
  const totalPercent = Number(data.chitosanMatrix) + Number(data.fillerPercent);

  return (
    <S.PreviewWrapper>
      <S.SectionTitle>Dane zamawiającego</S.SectionTitle>
      <S.GridSection>
        <S.InfoGroup>
          <S.Label>Lekarz</S.Label>
          <S.Value>{data.doctorName}</S.Value>
        </S.InfoGroup>
        <S.InfoGroup>
          <S.Label>Placówka</S.Label>
          <S.Value>{data.facilityData}</S.Value>
        </S.InfoGroup>
      </S.GridSection>
      <S.Divider />

      <S.SectionTitle>Specyfikacja Składu</S.SectionTitle>
      <S.GridSection>
        <S.InfoGroup>
          <S.Label>Matryca Chitozanowa</S.Label>
          <S.Value>{data.chitosanMatrix}%</S.Value>
        </S.InfoGroup>
        <S.InfoGroup>
          <S.Label>Napełniacz ({data.fillerType})</S.Label>
          <S.Value>{data.fillerPercent}%</S.Value>
        </S.InfoGroup>
      </S.GridSection>

      {totalPercent !== 100 && (
        <S.WarningBox>
          ⚠️ Suma składników wynosi {totalPercent}% (powinna 100%)
        </S.WarningBox>
      )}

      <S.FullWidthGroup style={{ marginTop: "10px" }}>
        <S.Label>Gęstość wyrobu</S.Label>
        <S.Value>{data.density}</S.Value>
      </S.FullWidthGroup>

      <S.Divider />

      <S.SectionTitle>Zamówione Objętości</S.SectionTitle>
      <S.VolumeGrid>
        {Object.entries(data.volumes || {}).map(
          ([key, val]) =>
            Number(val) > 0 && (
              <S.VolumeCard key={key}>
                <span className="size">{key.replace("v", "")}</span>
                <span className="count">{val} szt.</span>
              </S.VolumeCard>
            ),
        )}
      </S.VolumeGrid>
      {data.additionalNotes && (
        <S.NotesSection>
          <S.Label>Uwagi produkcyjne</S.Label>
          <S.LongText>{data.additionalNotes}</S.LongText>
        </S.NotesSection>
      )}
    </S.PreviewWrapper>
  );
};

export default NovaOssPreview;
