import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { device } from "../../assets/device";

// --- STYLED COMPONENTS ---

const FormContainer = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 13px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  line-height: 1.6;
  color: #333;
  @media ${device.tablet}{
    padding:40px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #0056b3;
  margin-bottom: 30px;
  padding-bottom: 10px;

  h1 {
    font-size: 24px;
    color: #0056b3;
    margin: 0;
  }
  .meta {
    font-size: 12px;
    color: #666;
    text-align: right;
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
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    margin-bottom: 8px;
    font-size: 14px;
  }

  input,
  textarea {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    &:focus {
      border-color: #0056b3;
      outline: none;
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const DropzoneContainer = styled.div<any>`
  border: 2px dashed ${(props) => (props.$active ? "#0056b3" : "#ccc")};
  background: ${(props) => (props.$active ? "#f0f7ff" : "#fafafa")};
  padding: 30px;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #0056b3;
  }
  p {
    margin: 0;
    color: ${(props) => (props.$hasFile ? "#28a745" : "#666")};
    font-weight: ${(props) => (props.$hasFile ? "bold" : "normal")};
  }
`;

const ErrorText = styled.div`
  color: #d9534f;
  font-size: 12px;
  margin-top: 5px;
`;

const InfoBox = styled.div`
  background: #fff9e6;
  border: 1px solid #ffeeba;
  padding: 15px;
  margin: 20px 0;
  font-size: 13px;
  border-radius: 4px;
  h4 {
    margin-top: 0;
    color: #856404;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  ul {
    padding-left: 20px;
  }
  li{
    font-size: 1rem;
  }
`;

const SubmitButton = styled.button`
  background-color: #0056b3;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  &:hover {
    background-color: #004494;
  }
  &:disabled {
    background-color: #ccc;
  }
`;

const TwoInputsGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media ${device.tablet} {
    flex-direction: row;
    justify-content: space-between;
    gap:1rem;
  }
  div{
    width: 100%;
  }
`;

const WarningBox = styled.div`
  background: #fff5f5;
  border: 1px solid #feb2b2;
  padding: 15px;
  margin: 20px 0;
  border-radius: 4px;

  p {
    margin: 0;
    color: #c53030;
    font-weight: bold;
    font-size: 14px;
    font-size: 1rem;
  }
`;

const InstructionsSection = styled.div`
  font-size: 13px;
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 25px;

  h4 {
    margin-bottom: 10px;
    color: #2d3748;
    border-bottom: 1px solid #edf2f7;
    padding-bottom: 5px;
  }

  ul {
    padding-left: 20px;
    margin-bottom: 15px;
  }

  li {
    margin-bottom: 8px;
  }
`;

const ProcedureHighlight = styled.div`
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  padding: 15px;
  border-radius: 6px;
  font-style: italic;
  font-size: 13px;
  color: #2d3748;

  p {
    margin: 5px 0;
    font-size: 1rem;
    display: flex;
    gap: 10px;
    &::before {
      content: "•";
      color: #0056b3;
      font-weight: bold;
    }
  }
`;
// --- WALIDACJA YUP ---

const validationSchema = Yup.object().shape({
  creationDate: Yup.date().required("Data jest wymagana"),
  doctorName: Yup.string().required("Imię i nazwisko lekarza jest wymagane"),
  facilityDetails: Yup.string().required("Dane placówki są wymagane"),
  phone: Yup.string().required("Telefon kontaktowy jest wymagany"),
  email: Yup.string()
    .email("Niepoprawny email")
    .required("Email jest wymagany"),
  surgeryDate: Yup.date().required("Data zabiegu jest wymagana"),
  patientId: Yup.string()
    .matches(/^[A-Z]{2}[0-9]{8}$/, "Format: XXDDMMRRRR (bez polskich znaków)")
    .required("ID Pacjenta jest wymagane"),
  medicalCase: Yup.string().required("Opis przypadku jest wymagany"),
  geometryDescription: Yup.string().required("Opis geometryczny jest wymagany"),
  gdprAccepted: Yup.boolean().oneOf([true], "Musisz zaakceptować klauzulę"),
  dicomFile: Yup.mixed().required("Załącz badanie DICOM (ZIP)"),
});

const CyberboneForm = () => {
  const [dragActive, setDragActive] = useState(false);

  const initialValues = {
    creationDate: "",
    doctorName: "",
    facilityDetails: "",
    phone: "",
    email: "",
    surgeryDate: "",
    patientId: "",
    medicalCase: "",
    geometryDescription: "",
    additionalNotes: "",
    gdprAccepted: false,
    dicomFile: null as any,
  };

  const handleDrag = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  return (
    <FormContainer>
      <Header>
        <div>
          <h1>Formularz wytycznych do projektu Cyberbone</h1>
        </div>
      </Header>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Dane formularza:", values);
          //   alert("Wysłano formularz wraz z plikiem: " + values.dicomFile?.name);
        }}>
        {({ setFieldValue, values, isSubmitting }) => (
          <Form>
            <SectionTitle>Dane ogólne</SectionTitle>

            <FormGroup>
              <label>Data utworzenia formularza</label>
              <Field name="creationDate" type="date" />
              <ErrorMessage name="creationDate" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <label>Nazwisko i imię lekarza</label>
              <Field name="doctorName" placeholder="Imię i nazwisko" />
              <ErrorMessage name="doctorName" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <label>
                Dane miejsca zabiegu (nazwa i adres placówki medycznej)
              </label>
              <Field name="facilityDetails" component="textarea" />
              <ErrorMessage name="facilityDetails" component={ErrorText} />
            </FormGroup>

            <TwoInputsGroup>
              <FormGroup>
                <label>Telefon kontaktowy</label>
                <Field name="phone" />
                <ErrorMessage name="phone" component={ErrorText} />
              </FormGroup>
              <FormGroup>
                <label>E-mail</label>
                <Field name="email" type="email" />
                <ErrorMessage name="email" component={ErrorText} />
              </FormGroup>
            </TwoInputsGroup>

            <FormGroup>
              <label>Przewidywana data zabiegu</label>
              <Field name="surgeryDate" type="date" />
              <ErrorMessage name="surgeryDate" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <label>ID Pacjenta (np. KL22022026)</label>
              <Field name="patientId" placeholder="Inicjały + Data zamówienia DDMMYYYY" />
              <small>
                UWAGA: Tworząc ID Pacjenta nie używaj polskich znaków.
              </small>
              <ErrorMessage name="patientId" component={ErrorText} />
            </FormGroup>

            <SectionTitle>Wytyczne do projektowania</SectionTitle>

            <FormGroup>
              <label>Opis przypadku medycznego i sposobu leczenia</label>
              <Field
                name="medicalCase"
                component="textarea"
                placeholder="Opis przypadku (onkologiczny/powypadkowy/wada wrodzona) oraz wdrożone/planowane leczenie."
              />
              <ErrorMessage name="medicalCase" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <label>Opis sugerowanej postaci geometrycznej implantu</label>
              <Field
                name="geometryDescription"
                component="textarea"
                placeholder="- Newralgiczne miejsca&#10;- Punkty mocowania&#10;- Sposób fiksacji, średnice i długości wkrętów"
              />
              <ErrorMessage name="geometryDescription" component={ErrorText} />
            </FormGroup>

            {/* SEKCJA PLIKU DICOM */}
            <FormGroup>
              <label>
                Przekazanie danych obrazowych (Plik DICOM w formacie .zip)
              </label>
              <input
                type="file"
                id="dicom-upload"
                hidden
                accept=".zip"
                onChange={(e) => {
                  const file = e.target.files?.[0]; // Bezpieczne pobranie pierwszego pliku
                  if (file) {
                    setFieldValue("dicomFile", file);
                  }
                }}
              />
              <DropzoneContainer
                $active={dragActive}
                $hasFile={!!values.dicomFile}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={(e: any) => {
                  e.preventDefault();
                  setDragActive(false);
                  if (e.dataTransfer.files[0])
                    setFieldValue("dicomFile", e.dataTransfer.files[0]);
                }}
                onClick={() =>
                  document.getElementById("dicom-upload")?.click()
                }>
                {values.dicomFile ? (
                  <p>
                    ✅ Załadowano: <strong>{values.dicomFile.name}</strong>
                  </p>
                ) : (
                  <p>Przeciągnij tutaj plik .zip lub kliknij</p>
                )}
              </DropzoneContainer>
              <ErrorMessage name="dicomFile" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <label>Dodatkowe uwagi</label>
              <Field name="additionalNotes" component="textarea" />
            </FormGroup>

            <InfoBox>
              <h4>WAŻNE: Wytyczne badania obrazowego</h4>
              <ul>
                <li>
                  Grubość warstwy (Slice Thickness): ≤ 0,25 (czaszka) / ≤ 0,5
                  (kości długie)
                </li>
                <li>Parametr kVP: min. 100kV (zalecane 120 - 140 kV)</li>
                <li>
                  Obszar objęty chorobą i jego symetryczna część względem
                  płaszczyzny strzałkowej
                </li>
              </ul>
            </InfoBox>

            <WarningBox>
              <p>
                UWAGA: Do każdego przypadku medycznego podchodzimy indywidualnie
                w związku z czym oferujemy konsultacje w zakresie wykonania
                badania TK. W przypadku braku możliwości spełnienia powyższych
                wymagań wskażemy możliwe miejsce wykonania badania obrazowania
                medycznego.
              </p>
            </WarningBox>

            <InstructionsSection>
              {/* <h4>Zasady przekazywania danych obrazowych Pacjenta:</h4>
              <ul>
                <li>
                  Plik należy nazwać używając <strong>ID Pacjenta</strong>.
                </li>
                <li>
                  Pliki z badania (np. TK, MRI) na płycie CD/pendrive/karcie
                  pamięci można przesłać tradycyjną pocztą wybierając opcję
                  listu poleconego.
                </li>
                <li>
                  Pliki DICOM (.zip) można przesłać na adres:
                  <a
                    href="mailto:project@syntplant.com"
                    style={{
                      color: "#0056b3",
                      fontWeight: "bold",
                      marginLeft: "4px",
                    }}>
                    project@syntplant.com
                  </a>
                  . Plik należy zabezpieczyć hasłem i przesłać je inną drogą
                  komunikacji (np. SMS).
                </li>
              </ul> */}

              <ProcedureHighlight>
                <p>
                  Przed ostatecznym wydrukiem wyrobu medycznego przygotowany
                  zostanie model struktury i implantu do akceptacji lekarza.
                </p>
                <p>
                  Zmiana systemu mocowania implantu w trakcie zabiegu wymaga
                  bezwarunkowego uzgodnienia z projektantami Syntplant sp. z
                  o.o.
                </p>
                <p>
                  Projektanci Syntplant Sp. z o.o. zastrzegają sobie prawo do
                  uczestnictwa podczas zabiegu/operacji.
                </p>
              </ProcedureHighlight>
            </InstructionsSection>

            <SectionTitle>Klauzula Danych Osobowych (RODO)</SectionTitle>
            <div
              style={{ fontSize: "11px", color: "#666", marginBottom: "15px" }}>
              Zgodnie z Rozporządzeniem 2016/679 (RODO), masz prawo do dostępu,
              skorygowania oraz usunięcia swoich danych. Dane dotyczące implantu
              będą przechowywane do czasu eksplantacji lub śmierci. Kontakt:
              office@syntplant.com
            </div>

            <FormGroup
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                gap: "10px",
              }}>
              <Field
                type="checkbox"
                name="gdprAccepted"
                id="gdprAccepted"
                style={{ marginTop: "5px" }}
              />
              <label
                htmlFor="gdprAccepted"
                style={{ fontWeight: "normal", fontSize: "13px" }}>
                Potwierdzam, że zapoznałem się z powyższymi informacjami oraz
                wytycznymi technicznymi Syntplant Sp. z o.o.
              </label>
            </FormGroup>
            <ErrorMessage name="gdprAccepted" component={ErrorText} />

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Wysyłanie..." : "Wyślij formularz zamówienia"}
            </SubmitButton>
          </Form>
        )}
      </Formik>

      <div
        style={{
          marginTop: "40px",
          textAlign: "right",
          borderTop: "1px solid #eee",
          paddingTop: "20px",
        }}></div>
    </FormContainer>
  );
};

export default CyberboneForm;
