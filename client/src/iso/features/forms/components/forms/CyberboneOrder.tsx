import { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as S from "./Styles";
import { api } from "../../../../../api/api";
import { useSaveOrderDocument } from "../../../orderDocuments/api/useSaveOrderDocument";

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
  dicomUrl: Yup.string().required(
    "Załącz i poczekaj na przesłanie badania DICOM",
  ),
});

const CyberboneForm = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const today = new Date().toISOString().split("T")[0];
  const { mutateAsync, isPending, isSuccess } = useSaveOrderDocument();

  const initialValues = {
    creationDate: today,
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
    dicomFile: null as File | null,
    dicomUrl: "",
  };

  const uploadDicom = async (file: File, setFieldValue: any) => {
    if (!file.name.endsWith(".zip")) {
      alert("Dozwolone są tylko pliki .zip");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    const fileData = new FormData();
    fileData.append("file", file);

    try {
      const uploadResponse = await api.post("/upload/upload-dicom", fileData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total || file.size;
          const current = progressEvent.loaded;
          let percentCompleted = Math.floor((current * 100) / total);

          // Sztuczne zatrzymanie na 95%, dopóki serwer nie zwróci 200 OK
          if (percentCompleted > 95) percentCompleted = 95;
          setUploadProgress(percentCompleted);
        },
      });

      setUploadProgress(100);
      setFieldValue("dicomUrl", uploadResponse.data.url);
      setFieldValue("dicomFile", file);
    } catch (error: any) {
      alert("Błąd podczas przesyłania pliku. Spróbuj ponownie.");
      handleRemoveFile(setFieldValue);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = (setFieldValue: any) => {
    setFieldValue("dicomFile", null);
    setFieldValue("dicomUrl", "");
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // To rozwiązuje problem ponownego wyboru tego samego pliku
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any,
  ) => {
    try {
      const { dicomFile, email, ...restOfValues } = values;
      const payload = {
        documentType: "CyberboneOrderForm",
        doctorEmail: email,
        ...restOfValues,
      };

      await mutateAsync(payload);
      resetForm();
      setUploadProgress(0);
    } catch (error: any) {
      alert("Wystąpił błąd podczas zapisywania formularza.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <S.FormContainer>
        <S.SuccessWrapper>
          <S.SuccessIcon>✅</S.SuccessIcon>
          <h2>Formularz został wysłany!</h2>
          <p>Dziękujemy za przesłanie wytycznych do projektu Cyberbone.</p>
        </S.SuccessWrapper>
      </S.FormContainer>
    );
  }

  return (
    <S.FormContainer>
      <S.Header>
        <h1>Formularz wytycznych do projektu Cyberbone</h1>
      </S.Header>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ setFieldValue, values }) => (
          <Form>
            <S.SectionTitle>Dane ogólne</S.SectionTitle>

            <S.FormGroup>
              <label>Data utworzenia formularza</label>
              <Field name="creationDate" type="date" />
              <ErrorMessage name="creationDate" component={S.ErrorText} />
            </S.FormGroup>

            <S.FormGroup>
              <label>Imię i nazwisko lekarza</label>
              <Field name="doctorName" placeholder="Imię i nazwisko" />
              <ErrorMessage name="doctorName" component={S.ErrorText} />
            </S.FormGroup>

            <S.FormGroup>
              <label>Dane miejsca zabiegu (nazwa i adres placówki)</label>
              <Field name="facilityDetails" component="textarea" />
              <ErrorMessage name="facilityDetails" component={S.ErrorText} />
            </S.FormGroup>

            <S.TwoInputsGroup>
              <S.FormGroup>
                <label>Telefon kontaktowy</label>
                <Field name="phone" />
                <ErrorMessage name="phone" component={S.ErrorText} />
              </S.FormGroup>
              <S.FormGroup>
                <label>E-mail</label>
                <Field name="email" type="email" />
                <ErrorMessage name="email" component={S.ErrorText} />
              </S.FormGroup>
            </S.TwoInputsGroup>

            <S.FormGroup>
              <label>Przewidywana data zabiegu</label>
              <Field name="surgeryDate" type="date" />
              <ErrorMessage name="surgeryDate" component={S.ErrorText} />
            </S.FormGroup>

            <S.FormGroup>
              <label>ID Pacjenta (np. KL22022026)</label>
              <Field name="patientId" placeholder="Inicjały + DDMMYYYY" />
              <small>UWAGA: Nie używaj polskich znaków.</small>
              <ErrorMessage name="patientId" component={S.ErrorText} />
            </S.FormGroup>

            <S.SectionTitle>Wytyczne do projektowania</S.SectionTitle>

            <S.FormGroup>
              <label>Opis przypadku i sposobu leczenia</label>
              <Field name="medicalCase" component="textarea" />
              <ErrorMessage name="medicalCase" component={S.ErrorText} />
            </S.FormGroup>

            <S.FormGroup>
              <label>Opis sugerowanej geometrii implantu</label>
              <Field name="geometryDescription" component="textarea" />
              <ErrorMessage
                name="geometryDescription"
                component={S.ErrorText}
              />
            </S.FormGroup>

            <S.FormGroup>
              <label>Przekazanie danych obrazowych (.zip)</label>
              <input
                ref={fileInputRef}
                type="file"
                id="dicom-upload"
                hidden
                accept=".zip"
                disabled={isUploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadDicom(file, setFieldValue);
                }}
              />
              <S.DropzoneContainer
                $active={dragActive}
                $hasFile={!!values.dicomFile}
                $isUploading={isUploading}
                onDragEnter={!isUploading ? handleDrag : undefined}
                onDragLeave={!isUploading ? handleDrag : undefined}
                onDragOver={!isUploading ? handleDrag : undefined}
                onDrop={
                  !isUploading
                    ? (e: any) => {
                        e.preventDefault();
                        setDragActive(false);
                        const file = e.dataTransfer.files[0];
                        if (file) uploadDicom(file, setFieldValue);
                      }
                    : undefined
                }
                onClick={() =>
                  !values.dicomFile &&
                  !isUploading &&
                  fileInputRef.current?.click()
                }>
                {isUploading ? (
                  <S.UploadStatusWrapper>
                    <p>
                      Dodawanie pliku: <strong>{uploadProgress}%</strong>
                    </p>
                    <S.ProgressBar $width={uploadProgress} />
                  </S.UploadStatusWrapper>
                ) : values.dicomFile ? (
                  <S.FileDetailsWrapper>
                    <p>
                      ✅ Załadowano: <strong>{values.dicomFile.name}</strong>
                    </p>
                    <S.RemoveFileBtn
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(setFieldValue);
                      }}>
                      Usuń plik ❌
                    </S.RemoveFileBtn>
                  </S.FileDetailsWrapper>
                ) : (
                  <p>Przeciągnij tutaj plik .zip lub kliknij</p>
                )}
              </S.DropzoneContainer>
              <ErrorMessage name="dicomUrl" component={S.ErrorText} />
            </S.FormGroup>

            <S.FormGroup>
              <label>Dodatkowe uwagi</label>
              <Field name="additionalNotes" component="textarea" />
            </S.FormGroup>

            <S.InfoBox>
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
            </S.InfoBox>

            <S.WarningBox>
              <p>
                UWAGA: Do każdego przypadku medycznego podchodzimy indywidualnie
                w związku z czym oferujemy konsultacje w zakresie wykonania
                badania TK. W przypadku braku możliwości spełnienia powyższych
                wymagań wskażemy możliwe miejsce wykonania badania obrazowania
                medycznego.
              </p>
            </S.WarningBox>

            <S.InstructionsSection>
              <S.ProcedureHighlight>
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
              </S.ProcedureHighlight>
            </S.InstructionsSection>

            <S.SectionTitle>Klauzula Danych Osobowych (RODO)</S.SectionTitle>
            <div
              style={{ fontSize: "11px", color: "#666", marginBottom: "15px" }}>
              Zgodnie z Rozporządzeniem 2016/679 (RODO), masz prawo do dostępu,
              skorygowania oraz usunięcia swoich danych. Dane dotyczące implantu
              będą przechowywane do czasu eksplantacji lub śmierci. Kontakt:
              office@syntplant.com
            </div>

            <S.FormGroup
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
            </S.FormGroup>
            <ErrorMessage name="gdprAccepted" component={S.ErrorText} />

            <S.SubmitButton type="submit" disabled={isPending || isUploading}>
              {isPending
                ? "Zapisywanie..."
                : isUploading
                  ? `Przesyłanie danych...`
                  : "Wyślij formularz zamówienia"}
            </S.SubmitButton>
          </Form>
        )}
      </Formik>
    </S.FormContainer>
  );
};

export default CyberboneForm;
