import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import * as S from "./Styles";
import { useSaveOrderDocument } from "../../../orderDocuments/api/useSaveOrderDocument";

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
  margin-bottom: 1rem;
`;

const FieldError = styled.div`
  color: #e74c3c;
  font-size: 11px;
  margin-top: 3px;
`;

const ValidationSummaryBox = styled.div`
  background: #fff5f5;
  border: 1px solid #e74c3c;
  border-radius: 6px;
  padding: 16px 20px;
  margin-top: 16px;

  h4 {
    color: #c0392b;
    margin: 0 0 10px 0;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  ul {
    margin: 0;
    padding-left: 18px;
    list-style: disc;
  }

  li {
    color: #c0392b;
    font-size: 12px;
    line-height: 1.8;
  }
`;

const FIELD_LABELS: Record<string, string> = {
  creationDate: "Data utworzenia",
  doctorName: "Imię i Nazwisko lekarza",
  facilityData: "Miejsce zabiegu",
  phone: "Telefon kontaktowy",
  email: "E-mail",
  chitosanMatrix: "Matryca chitozanowa (%)",
  fillerType: "Rodzaj napełniacza",
  fillerPercent: "Napełniacz (%)",
  density: "Gęstość wyrobu",
  volumes: "Liczba i objętość wyrobu (wybierz min. 1 ml)",
};

const ValidationSummary = () => {
  const { errors, submitCount } = useFormikContext<any>();

  if (submitCount === 0) return null;

  const flatErrors: { label: string; message: string }[] = [];

  Object.entries(errors).forEach(([key, value]) => {
    if (key === "volumes" && typeof value === "string") {
      flatErrors.push({ label: FIELD_LABELS["volumes"], message: value });
    } else if (typeof value === "string") {
      flatErrors.push({
        label: FIELD_LABELS[key] ?? key,
        message: value,
      });
    }
  });

  if (flatErrors.length === 0) return null;

  return (
    <ValidationSummaryBox>
      <h4>⚠ Popraw następujące błędy przed wysłaniem:</h4>
      <ul>
        {flatErrors.map(({ label, message }) => (
          <li key={label}>
            <strong>{label}</strong> — {message}
          </li>
        ))}
      </ul>
    </ValidationSummaryBox>
  );
};

const validationSchema = Yup.object().shape({
  creationDate: Yup.date().required("Wymagane"),
  doctorName: Yup.string().required("Wymagane"),
  facilityData: Yup.string().required("Wymagane"),
  phone: Yup.string().required("Wymagane"),
  email: Yup.string().email("Błędny e-mail").required("Wymagane"),
  chitosanMatrix: Yup.number()
    .min(1, "Wartość musi być większa od 0")
    .max(100)
    .required("Podaj %"),
  fillerType: Yup.string().required("Wymagane"),
  fillerPercent: Yup.number()
    .min(1, "Wartość musi być większa od 0")
    .max(100)
    .required("Podaj %"),
  density: Yup.string().required("Wymagane"),
  volumes: Yup.object().test(
    "at-least-one-volume",
    "Wybierz przynajmniej jedną objętość (sztuki > 0)",
    (val) => (val ? Object.values(val).some((v) => Number(v) > 0) : false),
  ),
});

const NovaOssProductionForm = () => {
  const { mutateAsync, isSuccess } = useSaveOrderDocument();

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

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const { doctorName, email, ...restOfValues } = values;
      const payload = {
        documentType: "NovaOssOrderForm",
        doctorName,
        doctorEmail: email,
        ...restOfValues,
      };
      await mutateAsync(payload);
    } catch (error: any) {
      console.error("Błąd wysyłki:", error);
      alert("Wystąpił błąd podczas przesyłania wytycznych.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <S.FormContainer>
        <S.SuccessWrapper>
          <S.SuccessIcon>🚀</S.SuccessIcon>
          <h2>Wytyczne wysłane do produkcji!</h2>
          <p>Zlecenie zostało zarejestrowane w systemie.</p>
        </S.SuccessWrapper>
      </S.FormContainer>
    );
  }

  return (
    <S.FormContainer>
      <S.Header>
        <h1>Wytyczne do produkcji NovaOss</h1>
      </S.Header>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ values }) => (
          <Form>
            <S.SectionTitle>1. Dane ogólne</S.SectionTitle>
            <Grid>
              <S.FormGroup>
                <label>Data utworzenia</label>
                <Field name="creationDate" type="date" />
                <ErrorMessage
                  name="creationDate"
                  render={(msg) => <FieldError>{msg}</FieldError>}
                />
              </S.FormGroup>
              <S.FormGroup>
                <label>Imię i Nazwisko lekarza</label>
                <Field name="doctorName" />
                <ErrorMessage
                  name="doctorName"
                  render={(msg) => <FieldError>{msg}</FieldError>}
                />
              </S.FormGroup>
            </Grid>

            <S.FormGroup>
              <label>Miejsce zabiegu (Nazwa i adres placówki)</label>
              <Field name="facilityData" component="textarea" rows="2" />
              <ErrorMessage
                name="facilityData"
                render={(msg) => <FieldError>{msg}</FieldError>}
              />
            </S.FormGroup>

            <Grid>
              <S.FormGroup>
                <label>Telefon kontaktowy</label>
                <Field name="phone" type="tel" />
                <ErrorMessage
                  name="phone"
                  render={(msg) => <FieldError>{msg}</FieldError>}
                />
              </S.FormGroup>
              <S.FormGroup>
                <label>E-mail</label>
                <Field name="email" type="email" />
                <ErrorMessage
                  name="email"
                  render={(msg) => <FieldError>{msg}</FieldError>}
                />
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
                  <ErrorMessage
                    name="chitosanMatrix"
                    render={(msg) => <FieldError>{msg}</FieldError>}
                  />
                </S.FormGroup>
                <S.FormGroup>
                  <label>Rodzaj napełniacza</label>
                  <Field name="fillerType" placeholder="np. Hydroksyapatyt" />
                  <ErrorMessage
                    name="fillerType"
                    render={(msg) => <FieldError>{msg}</FieldError>}
                  />
                </S.FormGroup>
                <S.FormGroup>
                  <label>Napełniacz (%)</label>
                  <Field name="fillerPercent" type="number" />
                  <ErrorMessage
                    name="fillerPercent"
                    render={(msg) => <FieldError>{msg}</FieldError>}
                  />
                </S.FormGroup>
              </Grid>

              <S.FormGroup style={{ marginTop: "15px" }}>
                <label>Gęstość wyrobu</label>
                <Field
                  name="density"
                  placeholder="Określ parametry gęstości..."
                />
                <ErrorMessage
                  name="density"
                  render={(msg) => <FieldError>{msg}</FieldError>}
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
                  <Field name="volumes.v1ml" type="number" min={0} />
                </VolumeRow>
                <VolumeRow>
                  <label>
                    <Field type="checkbox" name="v2ml_check" /> 2 ml - sztuk:
                  </label>
                  <Field name="volumes.v2ml" type="number" min={0} />
                </VolumeRow>
                <VolumeRow>
                  <label>
                    <Field type="checkbox" name="v4ml_check" /> 4 ml - sztuk:
                  </label>
                  <Field name="volumes.v4ml" type="number" min={0} />
                </VolumeRow>
              </div>
              <div>
                <VolumeRow>
                  <label>
                    <Field type="checkbox" name="v5ml_check" /> 5 ml - sztuk:
                  </label>
                  <Field name="volumes.v5ml" type="number" min={0} />
                </VolumeRow>
                <VolumeRow>
                  <label>
                    <Field type="checkbox" name="v10ml_check" /> 10 ml - sztuk:
                  </label>
                  <Field name="volumes.v10ml" type="number" min={0} />
                </VolumeRow>
              </div>
            </Grid>
            <ErrorMessage
              name="volumes"
              render={(msg) => (
                <FieldError style={{ marginTop: "6px" }}>{msg}</FieldError>
              )}
            />

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
              <strong>office@syntplant.com</strong>.
            </PrivacyBox>

            <S.SubmitButton type="submit">
              Prześlij wytyczne do produkcji
            </S.SubmitButton>

            <ValidationSummary />
          </Form>
        )}
      </Formik>
    </S.FormContainer>
  );
};

export default NovaOssProductionForm;
