import React, { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useFormikContext,
  FieldArray,
} from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import * as S from "./Styles";
import { useSaveOrderDocument } from "../../../orderDocuments/api/useSaveOrderDocument";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
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

const OrderItemCard = styled.div`
  background: #f9f9f9;
  border: 1px dashed #2d50dc;
  border-radius: 10px;
  padding: 16px 20px;
  margin-bottom: 14px;
  position: relative;
`;

const OrderItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;

  span {
    font-weight: 700;
    font-size: 13px;
    color: #2d50dc;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: 1px solid #e74c3c;
  color: #e74c3c;
  border-radius: 6px;
  padding: 3px 10px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background: #fff5f5;
  }
`;

const AddButton = styled.button`
  background: #2d50dc;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 22px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-top: 8px;
  &:hover {
    background: #2d50dc;
  }
`;

const SumWarning = styled.div`
  color: orange;
  font-size: 11px;
  font-weight: bold;
  margin-top: 6px;
`;

const ComboWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  select,
  input {
    width: 100%;
    font-size: 13px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

// --- Combo options ---

const CHITOSAN_PRESETS = [
  "10",
  "20",
  "30",
  "40",
  "50",
  "60",
  "70",
  "80",
  "90",
  "100",
];
const FILLER_TYPE_PRESETS = ["Hydroksyapatyt"];
const FILLER_PERCENT_PRESETS = [
  "10",
  "20",
  "30",
  "40",
  "50",
  "60",
  "70",
  "80",
  "90",
  "100",
];
const DENSITY_PRESETS = ["Niska", "Średnia", "Wysoka"];

// --- Combo select component (FIXED) ---

type ComboProps = {
  presets: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  isNumber?: boolean;
};

const ComboSelect = ({
  presets,
  value,
  onChange,
  placeholder,
  isNumber,
}: ComboProps) => {
  // Inicjalizujemy tryb "Custom" jeśli wartość nie pasuje do żadnego presetu i nie jest pusta
  const [isCustomMode, setIsCustomMode] = useState(
    value !== "" && !presets.includes(value),
  );

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "__custom__") {
      setIsCustomMode(true);
      onChange(""); // Czyścimy wartość, aby wymusić wpisanie nowej
    } else {
      setIsCustomMode(false);
      onChange(selectedValue);
    }
  };

  return (
    <ComboWrapper>
      <select
        value={isCustomMode ? "__custom__" : value}
        onChange={handleSelectChange}>
        <option value="">— wybierz —</option>
        {presets.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
        <option value="__custom__">Inne (wpisz)…</option>
      </select>

      {isCustomMode && (
        <input
          type={isNumber ? "number" : "text"}
          autoFocus
          placeholder={placeholder ?? "Wpisz wartość…"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </ComboWrapper>
  );
};

// --- Types ---

type OrderLine = {
  volumeMl: string;
  count: number;
  chitosanMatrix: string;
  fillerType: string;
  fillerPercent: string;
  density: string;
};

type FormValues = {
  creationDate: string;
  doctorName: string;
  facilityData: string;
  phone: string;
  email: string;
  orderLines: OrderLine[];
  additionalNotes: string;
};

const emptyLine = (): OrderLine => ({
  volumeMl: "",
  count: 1,
  chitosanMatrix: "",
  fillerType: "",
  fillerPercent: "",
  density: "",
});

// --- Validation ---

const orderLineSchema = Yup.object().shape({
  volumeMl: Yup.number()
    .typeError("Podaj objętość (liczba)")
    .positive("Wartość musi być > 0")
    .required("Wymagane"),
  count: Yup.number().min(1, "Min. 1 szt.").required("Wymagane"),
  chitosanMatrix: Yup.string().required("Wymagane"),
  fillerType: Yup.string().required("Wymagane"),
  fillerPercent: Yup.string().required("Wymagane"),
  density: Yup.string().required("Wymagane"),
});

const validationSchema = Yup.object().shape({
  creationDate: Yup.date().required("Wymagane"),
  doctorName: Yup.string().required("Wymagane"),
  facilityData: Yup.string().required("Wymagane"),
  phone: Yup.string().required("Wymagane"),
  email: Yup.string().email("Błędny e-mail").required("Wymagane"),
  orderLines: Yup.array()
    .of(orderLineSchema)
    .min(1, "Dodaj przynajmniej jedną pozycję zamówienia"),
});

// --- Validation Summary ---

const FIELD_LABELS: Record<string, string> = {
  creationDate: "Data utworzenia",
  doctorName: "Imię i Nazwisko lekarza",
  facilityData: "Miejsce zabiegu",
  phone: "Telefon kontaktowy",
  email: "E-mail",
  orderLines: "Pozycje zamówienia",
};

const ValidationSummary = () => {
  const { errors, submitCount } = useFormikContext<any>();
  if (submitCount === 0) return null;

  const flatErrors: { label: string; message: string }[] = [];

  Object.entries(errors).forEach(([key, value]) => {
    if (key === "orderLines" && Array.isArray(value)) {
      value.forEach((lineErr: any, idx: number) => {
        if (lineErr && typeof lineErr === "object") {
          Object.entries(lineErr).forEach(([field, msg]) => {
            if (typeof msg === "string") {
              flatErrors.push({
                label: `Pozycja ${idx + 1} — ${field}`,
                message: msg,
              });
            }
          });
        }
      });
    } else if (typeof value === "string") {
      flatErrors.push({ label: FIELD_LABELS[key] ?? key, message: value });
    }
  });

  if (flatErrors.length === 0) return null;

  return (
    <ValidationSummaryBox>
      <h4>⚠ Popraw następujące błędy przed wysłaniem:</h4>
      <ul>
        {flatErrors.map(({ label, message }, i) => (
          <li key={i}>
            <strong>{label}</strong> — {message}
          </li>
        ))}
      </ul>
    </ValidationSummaryBox>
  );
};

// --- Main Component ---

const NovaOssProductionForm = () => {
  const { mutateAsync, isSuccess } = useSaveOrderDocument();

  const initialValues: FormValues = {
    creationDate: new Date().toISOString().substr(0, 10),
    doctorName: "",
    facilityData: "",
    phone: "",
    email: "",
    orderLines: [emptyLine()],
    additionalNotes: "",
  };

  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    try {
      const { doctorName, email, ...rest } = values;
      await mutateAsync({
        documentType: "NovaOssOrderForm",
        doctorName,
        doctorEmail: email,
        ...rest,
      });
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
        {({ values, setFieldValue }) => (
          <Form>
            <S.SectionTitle>1. Dane ogólne</S.SectionTitle>
            <Grid>
              <S.FormGroup>
                <label>Data utworzenia</label>
                <Field name="creationDate" type="date" />
                <ErrorMessage name="creationDate" component={FieldError} />
              </S.FormGroup>
              <S.FormGroup>
                <label>Imię i Nazwisko lekarza</label>
                <Field name="doctorName" />
                <ErrorMessage name="doctorName" component={FieldError} />
              </S.FormGroup>
            </Grid>

            <S.FormGroup>
              <label>Miejsce zabiegu (Nazwa i adres placówki)</label>
              <Field name="facilityData" component="textarea" rows="2" />
              <ErrorMessage name="facilityData" component={FieldError} />
            </S.FormGroup>

            <Grid>
              <S.FormGroup>
                <label>Telefon kontaktowy</label>
                <Field name="phone" type="tel" />
                <ErrorMessage name="phone" component={FieldError} />
              </S.FormGroup>
              <S.FormGroup>
                <label>E-mail</label>
                <Field name="email" type="email" />
                <ErrorMessage name="email" component={FieldError} />
              </S.FormGroup>
            </Grid>

            <S.SectionTitle>2. Pozycje zamówienia</S.SectionTitle>

            <FieldArray name="orderLines">
              {({ push, remove }) => (
                <>
                  {values.orderLines.map((line, idx) => {
                    const sum =
                      (Number(line.chitosanMatrix) || 0) +
                      (Number(line.fillerPercent) || 0);
                    const prefix = `orderLines[${idx}]`;

                    return (
                      <OrderItemCard key={idx}>
                        <OrderItemHeader>
                          <span>Pozycja {idx + 1}</span>
                          {values.orderLines.length > 1 && (
                            <RemoveButton
                              type="button"
                              onClick={() => remove(idx)}>
                              Usuń
                            </RemoveButton>
                          )}
                        </OrderItemHeader>

                        <Grid>
                          <S.FormGroup>
                            <label>Liczba sztuk</label>
                            <Field
                              name={`${prefix}.count`}
                              type="number"
                              min="1"
                            />
                            <ErrorMessage
                              name={`${prefix}.count`}
                              component={FieldError}
                            />
                          </S.FormGroup>
                          
                          <S.FormGroup>
                            <label>Objętość (ml)</label>
                            <Field
                              name={`${prefix}.volumeMl`}
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder="np. 2"
                            />
                            <ErrorMessage
                              name={`${prefix}.volumeMl`}
                              component={FieldError}
                            />
                          </S.FormGroup>

                          <S.FormGroup>
                            <label>Matryca chitozanowa (%)</label>
                            <ComboSelect
                              presets={CHITOSAN_PRESETS}
                              value={line.chitosanMatrix}
                              onChange={(val) =>
                                setFieldValue(`${prefix}.chitosanMatrix`, val)
                              }
                              placeholder="Wpisz %…"
                              isNumber
                            />
                            <ErrorMessage
                              name={`${prefix}.chitosanMatrix`}
                              component={FieldError}
                            />
                          </S.FormGroup>

                          <S.FormGroup>
                            <label>Rodzaj napełniacza</label>
                            <ComboSelect
                              presets={FILLER_TYPE_PRESETS}
                              value={line.fillerType}
                              onChange={(val) =>
                                setFieldValue(`${prefix}.fillerType`, val)
                              }
                              placeholder="Wpisz rodzaj…"
                            />
                            <ErrorMessage
                              name={`${prefix}.fillerType`}
                              component={FieldError}
                            />
                          </S.FormGroup>

                          <S.FormGroup>
                            <label>Napełniacz (%)</label>
                            <ComboSelect
                              presets={FILLER_PERCENT_PRESETS}
                              value={line.fillerPercent}
                              onChange={(val) =>
                                setFieldValue(`${prefix}.fillerPercent`, val)
                              }
                              placeholder="Wpisz %…"
                              isNumber
                            />
                            <ErrorMessage
                              name={`${prefix}.fillerPercent`}
                              component={FieldError}
                            />
                          </S.FormGroup>

                          <S.FormGroup>
                            <label>Gęstość wyrobu</label>
                            <ComboSelect
                              presets={DENSITY_PRESETS}
                              value={line.density}
                              onChange={(val) =>
                                setFieldValue(`${prefix}.density`, val)
                              }
                              placeholder="Określ gęstość…"
                            />
                            <ErrorMessage
                              name={`${prefix}.density`}
                              component={FieldError}
                            />
                          </S.FormGroup>
                        </Grid>

                        {(line.chitosanMatrix !== "" ||
                          line.fillerPercent !== "") &&
                          sum !== 100 && (
                            <SumWarning>
                              Uwaga: Suma składników wynosi {sum}% (powinna
                              100%).
                            </SumWarning>
                          )}
                      </OrderItemCard>
                    );
                  })}

                  <AddButton type="button" onClick={() => push(emptyLine())}>
                    + Dodaj pozycję
                  </AddButton>
                </>
              )}
            </FieldArray>

            <S.FormGroup style={{ marginTop: "24px" }}>
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
