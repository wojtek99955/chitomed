import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import * as S from "./Styles";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const ProductionCard = styled.div`
  background: #f9f9f9;
  border: 1px dashed #6c5ce7;
  padding: 20px;
  border-radius: 8px;
`;

const VolumeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px;
  border-bottom: 1px solid #eee;
  input[type="number"] {
    width: 80px;
  }
`;

const PrivacyBox = styled.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  padding: 20px;
  font-size: 12px;
  color: #636e72;
  margin-top: 30px;
  line-height: 1.5;
  text-align: justify;
`;

const validationSchema = Yup.object().shape({
  creationDate: Yup.date().required("Wymagane"),
  doctorName: Yup.string().required("Wymagane"),
  facilityData: Yup.string().required("Wymagane"),
  email: Yup.string().email("Błędny e-mail").required("Wymagane"),
  chitosanMatrix: Yup.number().min(0).max(100).required("Podaj %"),
  fillerType: Yup.string().required("Podaj rodzaj napełniacza"),
  fillerPercent: Yup.number().min(0).max(100).required("Podaj %"),
  density: Yup.string().required("Określ gęstość"),
});

const NovaOssProductionForm = () => {
  const initialValues = {
    creationDate: new Date().toISOString().substr(0, 10),
    doctorName: "",
    facilityData: "",
    phone: "",
    email: "",
    chitosanMatrix: 0,
    fillerType: "",
    fillerPercent: 0,
    density: "",
    volumes: {
      v1ml: 0,
      v2ml: 0,
      v4ml: 0,
      v5ml: 0,
      v10ml: 0,
    },
    additionalNotes: "",
  };

  return (
    <S.FormContainer>
      <S.Header>
        <h1>Wytyczne do produkcji NovaOss</h1>
      </S.Header>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log("Zlecenie produkcji:", values)}>
        {({ values }) => (
          <Form>
            <S.SectionTitle>1. Dane ogólne</S.SectionTitle>
            <Grid>
              <S.FormGroup>
                <label>Data utworzenia</label>
                <Field name="creationDate" type="date" />
              </S.FormGroup>
              <S.FormGroup>
                <label>Imię i Nazwisko lekarza</label>
                <Field name="doctorName" placeholder="Lek. med..." />
              </S.FormGroup>
            </Grid>

            <S.FormGroup>
              <label>Miejsce zabiegu (Nazwa i adres placówki)</label>
              <Field name="facilityData" component="textarea" rows="2" />
            </S.FormGroup>

            <Grid>
              <S.FormGroup>
                <label>Telefon kontaktowy</label>
                <Field name="phone" type="tel" />
              </S.FormGroup>
              <S.FormGroup>
                <label>E-mail</label>
                <Field name="email" type="email" />
              </S.FormGroup>
            </Grid>

            <S.SectionTitle>
              2. Wytyczne do produkcji (Skład i Gęstość)
            </S.SectionTitle>
            <ProductionCard>
              <Grid>
                <S.FormGroup>
                  <label>Matryca chitozanowa (%)</label>
                  <Field name="chitosanMatrix" type="number" />
                </S.FormGroup>
                <S.FormGroup>
                  <label>Rodzaj napełniacza</label>
                  <Field name="fillerType" placeholder="np. Hydroksyapatyt" />
                </S.FormGroup>
                <S.FormGroup>
                  <label>Napełniacz (%)</label>
                  <Field name="fillerPercent" type="number" />
                </S.FormGroup>
              </Grid>

              <S.FormGroup style={{ marginTop: "15px" }}>
                <label>Gęstość wyrobu</label>
                <Field
                  name="density"
                  placeholder="Określ parametry gęstości..."
                />
              </S.FormGroup>

              {Number(values.chitosanMatrix) + Number(values.fillerPercent) !==
                100 && (
                <div
                  style={{
                    color: "orange",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}>
                  Uwaga: Suma składników wynosi{" "}
                  {Number(values.chitosanMatrix) + Number(values.fillerPercent)}
                  % (powinna 100%).
                </div>
              )}
            </ProductionCard>

            <S.SectionTitle>3. Liczba i objętość wyrobu</S.SectionTitle>
            <Grid>
              <div>
                <VolumeRow>
                  <label>
                    <Field type="checkbox" name="v1ml_check" /> 1 ml - sztuk:
                  </label>
                  <Field name="volumes.v1ml" type="number" />
                </VolumeRow>
                <VolumeRow>
                  <label>
                    <Field type="checkbox" name="v2ml_check" /> 2 ml - sztuk:
                  </label>
                  <Field name="volumes.v2ml" type="number" />
                </VolumeRow>
                <VolumeRow>
                  <label>
                    <Field type="checkbox" name="v4ml_check" /> 4 ml - sztuk:
                  </label>
                  <Field name="volumes.v4ml" type="number" />
                </VolumeRow>
              </div>
              <div>
                <VolumeRow>
                  <label>
                    <Field type="checkbox" name="v5ml_check" /> 5 ml - sztuk:
                  </label>
                  <Field name="volumes.v5ml" type="number" />
                </VolumeRow>
                <VolumeRow>
                  <label>
                    <Field type="checkbox" name="v10ml_check" /> 10 ml - sztuk:
                  </label>
                  <Field name="volumes.v10ml" type="number" />
                </VolumeRow>
              </div>
            </Grid>

            <S.FormGroup style={{ marginTop: "20px" }}>
              <label>Dodatkowe uwagi do produkcji</label>
              <Field name="additionalNotes" component="textarea" rows="3" />
            </S.FormGroup>

            <PrivacyBox>
              <strong>KLAUZULA DANYCH OSOBOWYCH:</strong>
              <br />
              Syntplant sp. z o.o. wdraża przetwarzanie danych mające na celu
              zarządzanie relacjami z klientem oraz poprawę monitorowania stanu
              implantów. Zgodnie z RODO (2016/679), masz prawo do dostępu,
              skorygowania, usunięcia lub ograniczenia przetwarzania swoich
              danych. Kontakt z Inspektorem Ochrony Danych:{" "}
              <strong>office@syntplant.com</strong>. Pełna treść dostępna w
              siedzibie firmy.
            </PrivacyBox>

            <S.SubmitButton type="submit">
              Prześlij wytyczne do produkcji
            </S.SubmitButton>
          </Form>
        )}
      </Formik>
    </S.FormContainer>
  );
};

export default NovaOssProductionForm;
