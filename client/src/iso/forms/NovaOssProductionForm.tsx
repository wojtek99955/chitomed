import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

// --- STYLED COMPONENTS (Spójne z poprzednimi) ---

const FormContainer = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 40px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const FormHeader = styled.div`
  border-bottom: 3px solid #0056b3; // Fioletowy akcent dla produkcji/technologii
  margin-bottom: 30px;
  padding-bottom: 10px;
  h1 {
    font-size: 24px;
    color: #2d3436;
    margin: 0;
    text-transform: uppercase;
  }
`;

const SectionTitle = styled.h2`
  background: #f4f7f9;
  padding: 10px 15px;
  font-size: 18px;
  border-left: 5px solid #0056b3;
  margin: 25px 0 15px 0;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  label {
    font-weight: 600;
    margin-bottom: 5px;
    font-size: 14px;
  }
  input,
  select,
  textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    &:focus {
      border-color: #0056b3;
      outline: none;
      box-shadow: 0 0 0 3px rgba(44, 80, 220, 0.1);
    }
  }
`;

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

const SubmitButton = styled.button`
  background-color: #0056b3;
  color: white;
  padding: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  margin-top: 20px;
  &:hover {
    background-color: #0056b3;
  }
`;

// --- WALIDACJA ---

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
    <FormContainer>
      <FormHeader>
        <h1>Wytyczne do produkcji NovaOss</h1>
      </FormHeader>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log("Zlecenie produkcji:", values)}>
        {({ values }) => (
          <Form>
            <SectionTitle>1. Dane ogólne</SectionTitle>
            <Grid>
              <FormGroup>
                <label>Data utworzenia</label>
                <Field name="creationDate" type="date" />
              </FormGroup>
              <FormGroup>
                <label>Imię i Nazwisko lekarza</label>
                <Field name="doctorName" placeholder="Lek. med..." />
              </FormGroup>
            </Grid>

            <FormGroup>
              <label>Miejsce zabiegu (Nazwa i adres placówki)</label>
              <Field name="facilityData" component="textarea" rows="2" />
            </FormGroup>

            <Grid>
              <FormGroup>
                <label>Telefon kontaktowy</label>
                <Field name="phone" type="tel" />
              </FormGroup>
              <FormGroup>
                <label>E-mail</label>
                <Field name="email" type="email" />
              </FormGroup>
            </Grid>

            <SectionTitle>
              2. Wytyczne do produkcji (Skład i Gęstość)
            </SectionTitle>
            <ProductionCard>
              <Grid>
                <FormGroup>
                  <label>Matryca chitozanowa (%)</label>
                  <Field name="chitosanMatrix" type="number" />
                </FormGroup>
                <FormGroup>
                  <label>Rodzaj napełniacza</label>
                  <Field name="fillerType" placeholder="np. Hydroksyapatyt" />
                </FormGroup>
                <FormGroup>
                  <label>Napełniacz (%)</label>
                  <Field name="fillerPercent" type="number" />
                </FormGroup>
              </Grid>

              <FormGroup style={{ marginTop: "15px" }}>
                <label>Gęstość wyrobu</label>
                <Field
                  name="density"
                  placeholder="Określ parametry gęstości..."
                />
              </FormGroup>

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

            <SectionTitle>3. Liczba i objętość wyrobu</SectionTitle>
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

            <FormGroup style={{ marginTop: "20px" }}>
              <label>Dodatkowe uwagi do produkcji</label>
              <Field name="additionalNotes" component="textarea" rows="3" />
            </FormGroup>

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

            <SubmitButton type="submit">
              Prześlij wytyczne do produkcji
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default NovaOssProductionForm;
