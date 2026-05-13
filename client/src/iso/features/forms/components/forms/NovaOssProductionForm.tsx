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
  background: #eceffc;
  border-radius: 4px;
  padding: 15px 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-top: 8px;
  color: #2d50dc;
  border: 1px solid #2d50dc;
  transition: all 200ms;
  &:hover {
    background: #2d50dc;
    color: white;
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
  select:disabled {
    background: #eeeeee;
    cursor: not-allowed;
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
const FILLER_PERCENT_PRESETS = [
  "0",
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

// --- Combo select component ---
type ComboProps = {
  presets: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  isNumber?: boolean;
  disabled?: boolean;
  hideCustom?: boolean;
};

const ComboSelect = ({
  presets,
  value,
  onChange,
  placeholder,
  isNumber,
  disabled,
  hideCustom,
}: ComboProps) => {
  const [isCustomMode, setIsCustomMode] = useState(
    value !== "" && !presets.includes(value) && !hideCustom,
  );

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "__custom__") {
      setIsCustomMode(true);
      onChange("");
    } else {
      setIsCustomMode(false);
      onChange(selectedValue);
    }
  };

  return (
    <ComboWrapper>
      <select
        value={isCustomMode ? "__custom__" : value}
        onChange={handleSelectChange}
        disabled={disabled}>
        <option value="">— wybierz —</option>
        {presets.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
        {!hideCustom && <option value="__custom__">Inne (wpisz)…</option>}
      </select>

      {isCustomMode && !hideCustom && (
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

// --- Form Logic ---
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
  fillerType: "Hydroksyapatyt",
  fillerPercent: "",
  density: "",
});

const orderLineSchema = Yup.object().shape({
  volumeMl: Yup.number()
    .typeError("Podaj liczbę")
    .positive("Musi być > 0")
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
  orderLines: Yup.array().of(orderLineSchema).min(1, "Dodaj pozycję"),
});

const FIELD_LABELS: Record<string, string> = {
  creationDate: "Data",
  doctorName: "Lekarz",
  facilityData: "Miejsce",
  phone: "Telefon",
  email: "E-mail",
  orderLines: "Pozycje",
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
            if (typeof msg === "string")
              flatErrors.push({
                label: `Poz. ${idx + 1} — ${field}`,
                message: msg,
              });
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
      <h4>⚠ Popraw błędy przed wysłaniem:</h4>
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

const NovaOssProductionForm = () => {
  const { mutateAsync, isSuccess } = useSaveOrderDocument();

  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    try {
      await mutateAsync({
        documentType: "NovaOssOrderForm",
        doctorEmail: values.email,
        ...values,
      });
    } catch (error) {
      alert("Wystąpił błąd podczas przesyłania.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <S.FormContainer>
        <S.SuccessWrapper>
          <S.SuccessIcon>🚀</S.SuccessIcon>
          <h2>Wytyczne wysłane!</h2>
          <p>Zlecenie zostało zarejestrowane.</p>
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
        initialValues={{
          creationDate: new Date().toISOString().substr(0, 10),
          doctorName: "",
          facilityData: "",
          phone: "",
          email: "",
          orderLines: [emptyLine()],
          additionalNotes: "",
        }}
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
              <label>Miejsce zabiegu</label>
              <Field name="facilityData" component="textarea" rows="2" />
              <ErrorMessage name="facilityData" component={FieldError} />
            </S.FormGroup>
            <Grid>
              <S.FormGroup>
                <label>Telefon</label>
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
                    const prefix = `orderLines[${idx}]`;
                    const sum =
                      (Number(line.chitosanMatrix) || 0) +
                      (Number(line.fillerPercent) || 0);

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
                              onChange={(val) => {
                                setFieldValue(`${prefix}.chitosanMatrix`, val);
                                const num = Number(val);
                                if (!isNaN(num) && val !== "") {
                                  setFieldValue(
                                    `${prefix}.fillerPercent`,
                                    String(Math.max(0, 100 - num)),
                                  );
                                }
                              }}
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
                              presets={["Hydroksyapatyt"]}
                              value={line.fillerType}
                              onChange={() => {}}
                              disabled={true}
                              hideCustom={true}
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
                              onChange={(val) => {
                                setFieldValue(`${prefix}.fillerPercent`, val);
                                const num = Number(val);
                                if (!isNaN(num) && val !== "") {
                                  setFieldValue(
                                    `${prefix}.chitosanMatrix`,
                                    String(Math.max(0, 100 - num)),
                                  );
                                }
                              }}
                              isNumber
                            />
                            <ErrorMessage
                              name={`${prefix}.fillerPercent`}
                              component={FieldError}
                            />
                          </S.FormGroup>

                          <S.FormGroup>
                            <label>Gęstość</label>
                            <ComboSelect
                              presets={DENSITY_PRESETS}
                              value={line.density}
                              onChange={(val) =>
                                setFieldValue(`${prefix}.density`, val)
                              }
                            />
                            <ErrorMessage
                              name={`${prefix}.density`}
                              component={FieldError}
                            />
                          </S.FormGroup>
                        </Grid>
                        {sum !== 100 &&
                          (line.chitosanMatrix !== "" ||
                            line.fillerPercent !== "") && (
                            <SumWarning>
                              Suma składników: {sum}% (wymagane 100%).
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
              <label>Dodatkowe uwagi</label>
              <Field name="additionalNotes" component="textarea" rows="3" />
            </S.FormGroup>

            <PrivacyBox>
              Syntplant sp. z o.o. przetwarza dane w celu realizacji zamówienia.
              Kontakt: office@syntplant.com.
            </PrivacyBox>
            <S.SubmitButton type="submit">Prześlij wytyczne</S.SubmitButton>
            <ValidationSummary />
          </Form>
        )}
      </Formik>
    </S.FormContainer>
  );
};

export default NovaOssProductionForm;
