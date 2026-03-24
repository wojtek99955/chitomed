import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import * as S from "./Styles";
import { device } from "../../../../../assets/device";
import { useParams } from "react-router-dom";
import { useSaveOrderDocument } from "../../../orderDocuments/api/useSaveOrderDocument";

const FormGroup = styled.div`
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  label {
    font-weight: 600;
    margin-bottom: 6px;
    font-size: 14px;
  }
  input,
  textarea,
  select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    &:focus {
      border-color: #0056b3;
      outline: none;
      box-shadow: 0 0 0 3px rgba(44, 80, 220, 0.1);
    }
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  padding: 10px;
  background: #fffafa;
  border: 1px solid #f5e1e1;
  border-radius: 4px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  cursor: pointer;
  input {
    cursor: pointer;
    width: 18px;
    height: 18px;
  }
`;

const validationSchema = Yup.object().shape({
  reporterStatus: Yup.string().required("Wybierz status zgłaszającego"),
  reporterName: Yup.string().required("Wymagane"),
  contactPerson: Yup.string().required("Wymagane"),
  email: Yup.string().email("Błędny format").required("Wymagane"),
  productName: Yup.string().required("Wymagane"),
  incidentDate: Yup.date().required("Wymagane"),
  incidentDescription: Yup.string()
    .min(20, "Opis zbyt krótki")
    .required("Wymagane"),
  declaration: Yup.boolean().oneOf(
    [true],
    "Musisz potwierdzić prawdziwość danych",
  ),
});

const MedicalIncidentForm = () => {
  const { mutateAsync, isSuccess } = useSaveOrderDocument();
  const { id } = useParams();
  const initialValues = {
    reporterStatus: "",
    otherStatus: "",
    reporterName: "",
    contactPerson: "",
    reporterAddress: "",
    postalCode: "",
    city: "",
    country: "",
    email: "",
    phone: "",
    productName: "",
    modelNumber: "",
    prodDate: "",
    expiryDate: "",
    implantDate: "",
    removalDate: "",
    duration: "",
    reportToManufacturerDate: "",
    incidentDate: "",
    incidentLocation: "",
    incidentDescription: "",
    userType: "",
    usageType: "",
    usageOther: "",
    patientOutcome: "",
    actionsTaken: "",
    patientGender: "",
    patientAge: "",
    patientWeight: "",
    notes: "",
    declaration: false,
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const payload = {
        documentType: "medical-event",
        orderId: id,
        ...values,
      };

      await mutateAsync(payload);
      console.log("Incydent został zgłoszony pomyślnie!");
    } catch (error: any) {
      console.error("Błąd wysyłki incydentu:", error);
      alert("Nie udało się wysłać zgłoszenia. Spróbuj ponownie później.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <S.FormContainer>
        <S.SuccessWrapper>
          <S.SuccessIcon>📩</S.SuccessIcon>
          <h2>Zgłoszenie zostało wysłane</h2>
          <p>Dziękujemy za przesłanie informacji o incydencie medycznym.</p>
        </S.SuccessWrapper>
      </S.FormContainer>
    );
  }

  return (
    <S.FormContainer>
      <S.Header>
        <h1>Formularz zgłoszenia incydentu medycznego</h1>
      </S.Header>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ values, isSubmitting }) => (
          <Form>
            <S.SectionTitle>1. Informacje o zgłaszającym</S.SectionTitle>
            <S.FormGroup>
              <label>Status zgłaszającego</label>
              <CheckboxGroup>
                <CheckboxLabel>
                  <Field type="radio" name="reporterStatus" value="patient" />{" "}
                  Osoba niebędąca profesjonalnym użytkownikiem / Pacjent
                </CheckboxLabel>
                <CheckboxLabel>
                  <Field type="radio" name="reporterStatus" value="doctor" />{" "}
                  Świadczeniodawca (lekarz)
                </CheckboxLabel>
                <CheckboxLabel>
                  <Field type="radio" name="reporterStatus" value="authority" />{" "}
                  Organ nadzoru/inspekcji
                </CheckboxLabel>
                <CheckboxLabel>
                  <Field type="radio" name="reporterStatus" value="service" />{" "}
                  Podmiot serwisujący / kalibrujący
                </CheckboxLabel>
                <CheckboxLabel>
                  <Field type="radio" name="reporterStatus" value="other" />{" "}
                  Inny (określić poniżej)
                </CheckboxLabel>
                {values.reporterStatus === "other" && (
                  <Field name="otherStatus" placeholder="Określ rolę..." />
                )}
              </CheckboxGroup>
              <ErrorMessage name="reporterStatus" component={S.ErrorText} />
            </S.FormGroup>

            <Row>
              <S.FormGroup>
                <label>Nazwa / Imię i nazwisko zgłaszającego</label>
                <Field name="reporterName" />
              </S.FormGroup>
              <S.FormGroup>
                <label>Osoba do kontaktu</label>
                <Field name="contactPerson" />
              </S.FormGroup>
            </Row>
            <Row>
              <S.FormGroup>
                <label>Adres</label>
                <Field name="reporterAddress" />
              </S.FormGroup>
              <S.FormGroup>
                <label>Kod pocztowy</label>
                <Field name="postalCode" />
              </S.FormGroup>
            </Row>
            <Row>
              <S.FormGroup>
                <label>Miejscowość</label>
                <Field name="city" />
              </S.FormGroup>
              <S.FormGroup>
                <label>E-mail</label>
                <Field name="email" type="email" />
              </S.FormGroup>
            </Row>

            <S.SectionTitle>2. Informacje o wyrobie</S.SectionTitle>
            <Row>
              <S.FormGroup>
                <label>Nazwa handlowa</label>
                <Field name="productName" />
              </S.FormGroup>
              <S.FormGroup>
                <label>Model lub numer wyrobu</label>
                <Field name="modelNumber" />
              </S.FormGroup>
            </Row>
            <Row>
              <S.FormGroup>
                <label>Data produkcji</label>
                <Field name="prodDate" type="date" />
              </S.FormGroup>
              <S.FormGroup>
                <label>Data ważności</label>
                <Field name="expiryDate" type="date" />
              </S.FormGroup>
            </Row>
            <Row>
              <S.FormGroup>
                <label>Data wszczepienia</label>
                <Field name="implantDate" type="date" />
              </S.FormGroup>
              <S.FormGroup>
                <label>Data usunięcia (jeśli dotyczy)</label>
                <Field name="removalDate" type="date" />
              </S.FormGroup>
            </Row>

            <S.SectionTitle>
              3. Informacje o incydencie medycznym
            </S.SectionTitle>
            <Row>
              <S.FormGroup>
                <label>Data wystąpienia incydentu</label>
                <Field name="incidentDate" type="date" />
              </S.FormGroup>
              <S.FormGroup>
                <label>Miejsce wystąpienia</label>
                <Field
                  name="incidentLocation"
                  placeholder="np. Sala operacyjna, Oddział..."
                />
              </S.FormGroup>
            </Row>
            <S.FormGroup>
              <label>Opis incydentu</label>
              <Field
                name="incidentDescription"
                component="textarea"
                rows="5"
                placeholder="Proszę szczegółowo opisać przebieg zdarzenia..."
              />
              <ErrorMessage
                name="incidentDescription"
                component={S.ErrorText}
              />
            </S.FormGroup>

            <Row>
              <FormGroup>
                <label>Osoba posługująca się wyrobem</label>
                <Field as="select" name="userType">
                  <option value="">Wybierz...</option>
                  <option value="pro">Profesjonalny użytkownik</option>
                  <option value="patient">Pacjent</option>
                  <option value="other">Inna</option>
                </Field>
              </FormGroup>
              <FormGroup>
                <label>Użycie wyrobu</label>
                <Field as="select" name="usageType">
                  <option value="">Wybierz...</option>
                  <option value="first">Pierwsze użycie</option>
                  <option value="before">
                    Problem zauważony przed użyciem
                  </option>
                  <option value="other">Inne</option>
                </Field>
              </FormGroup>
            </Row>

            <S.FormGroup>
              <label>Skutki dla Pacjenta</label>
              <Field name="patientOutcome" component="textarea" />
            </S.FormGroup>

            <S.SectionTitle>4. Dane Pacjenta</S.SectionTitle>
            <Row>
              <S.FormGroup>
                <label>Płeć</label>
                <div
                  style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
                  <CheckboxLabel>
                    <Field type="radio" name="patientGender" value="K" />{" "}
                    Kobieta
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <Field type="radio" name="patientGender" value="M" />{" "}
                    Mężczyzna
                  </CheckboxLabel>
                </div>
              </S.FormGroup>
              <S.FormGroup>
                <label>Wiek Pacjenta</label>
                <Field name="patientAge" type="number" />
              </S.FormGroup>
              <S.FormGroup>
                <label>Masa ciała [kg]</label>
                <Field name="patientWeight" type="number" />
              </S.FormGroup>
            </Row>

            <S.FormGroup>
              <label>Dodatkowe uwagi</label>
              <Field name="notes" component="textarea" />
            </S.FormGroup>

            <CheckboxGroup style={{ background: "#fdfdfd", marginTop: "30px" }}>
              <CheckboxLabel>
                <Field type="checkbox" name="declaration" />
                <strong>
                  Potwierdzam, że powyższe informacje są zgodne z prawdą oraz
                  podane według mojej najlepszej wiedzy.
                </strong>
              </CheckboxLabel>
              <ErrorMessage name="declaration" component={S.ErrorText} />
            </CheckboxGroup>

            <S.SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Wysyłanie..." : "Wyślij zgłoszenie incydentu"}
            </S.SubmitButton>
          </Form>
        )}
      </Formik>
    </S.FormContainer>
  );
};

export default MedicalIncidentForm;
