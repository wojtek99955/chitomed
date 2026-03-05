import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

// --- REUŻYWALNE STYLE (zgodne z poprzednim formularzem) ---

const FormContainer = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 40px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  line-height: 1.6;
  color: #333;
`;

const FormHeader = styled.div`
  border-bottom: 3px solid #28a745; // Zielony akcent dla ankiet/feedbacku
  margin-bottom: 30px;
  padding-bottom: 15px;
  h1 {
    font-size: 24px;
    color: #2c3e50;
    margin: 0;
    text-transform: uppercase;
  }
  p {
    font-size: 14px;
    color: #666;
    margin-top: 10px;
  }
`;

const InfoBox = styled.div`
  background: #f3fcf5;
  border-left: 4px solid #28a745;
  padding: 15px;
  margin-bottom: 25px;
  border-radius: 6px;
  font-size: 14px;
  color: #444;
`;

const QuestionSection = styled.div`
  margin-bottom: 35px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 6px;
  p{
    margin-bottom: 1rem;
  }
`;

const QuestionText = styled.label`
  font-weight: 600;
  display: block;
  margin-bottom: 15px;
  font-size: 1.2rem;
  color: #2c3e50;
`;

const ScaleWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;

const RadioButtonCustom = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: 13px;
  input {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const FormGroup = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    resize: vertical;
    &:focus {
      border-color: #28a745;
      outline: none;
    }
  }
`;

const ErrorText = styled.div`
  color: #d9534f;
  font-size: 12px;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  transition: background 0.2s;
  &:hover {
    background-color: #218838;
  }
  &:disabled {
    background-color: #ccc;
  }
`;

// --- WALIDACJA ---

const validationSchema = Yup.object().shape({
  effectiveness: Yup.string().required("Proszę wybrać ocenę"),
  adverseEvents: Yup.string().required("Proszę zaznaczyć odpowiedź"),
  adverseDescription: Yup.string().when("adverseEvents", {
    is: "yes",
    then: (schema) => schema.required("Proszę opisać reakcję niepożądaną"),
    otherwise: (schema) => schema.notRequired(),
  }),
  easeOfUse: Yup.string().required("Proszę wybrać ocenę"),
  longTermResults: Yup.string().required("Proszę wybrać ocenę"),
  overallSatisfaction: Yup.string().required("Proszę wybrać ocenę"),
});

const PMCFSurvey = () => {
  const initialValues = {
    effectiveness: "",
    effectivenessComment: "",
    adverseEvents: "",
    adverseDescription: "",
    easeOfUse: "",
    easeOfUseComment: "",
    longTermResults: "",
    longTermResultsComment: "",
    overallSatisfaction: "",
    overallComment: "",
    additionalNotes: "",
    orderCode: "", // Traceability
  };

  const renderScale = (name:any) => (
    <ScaleWrapper>
      {[1, 2, 3, 4, 5].map((num) => (
        <RadioButtonCustom key={num}>
          <Field type="radio" name={name} value={String(num)} />
          {num}
        </RadioButtonCustom>
      ))}
    </ScaleWrapper>
  );

  return (
    <FormContainer>
      <FormHeader>
        <h1>Ankieta</h1>
      </FormHeader>

      <InfoBox>
        Dziękujemy za współpracę. Ankieta jest{" "}
        <strong>anonimowa i dobrowolna</strong>. Służy do zbierania danych
        klinicznych w celu doskonalenia wyrobu i zgodności z MDR. Wypełnienie
        zajmie ok. 5 minut.
        <br />
        <br />
        <strong>Wyrób:</strong> System Implantologiczny / Membrana
        stomatologiczna
        <br />
        <strong>Przeznaczenie:</strong> Regeneracja wyrostka zębodołowego
      </InfoBox>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Dane ankiety:", values);
          alert("Dziękujemy za wypełnienie ankiety!");
        }}>
        {({ values, isSubmitting }) => (
          <Form>
            {/* Pytanie 1 */}
            <QuestionSection>
              <QuestionText>
                1. Jak oceniasz skuteczność ochrony wyrostka zębodołowego (czas
                gojenia tkanek miękkich)?
              </QuestionText>
              <p style={{ fontSize: "12px", color: "#888" }}>
                (1 – bardzo słaba, 5 – doskonała)
              </p>
              {renderScale("effectiveness")}
              <ErrorMessage name="effectiveness" component={ErrorText} />

              <FormGroup>
                <Field
                  name="effectivenessComment"
                  component="textarea"
                  placeholder="Komentarz (opcjonalny)..."
                  rows="2"
                />
              </FormGroup>
            </QuestionSection>

            {/* Pytanie 2 */}
            <QuestionSection>
              <QuestionText>
                2. Czy wystąpiły reakcje niepożądane (np. obrzęk, infekcja)?
              </QuestionText>
              <ScaleWrapper>
                <RadioButtonCustom style={{ flexDirection: "row" }}>
                  <Field type="radio" name="adverseEvents" value="no" /> Nie
                </RadioButtonCustom>
                <RadioButtonCustom style={{ flexDirection: "row" }}>
                  <Field type="radio" name="adverseEvents" value="yes" /> Tak
                </RadioButtonCustom>
              </ScaleWrapper>
              <ErrorMessage name="adverseEvents" component={ErrorText} />

              {values.adverseEvents === "yes" && (
                <FormGroup>
                  <Field
                    name="adverseDescription"
                    component="textarea"
                    placeholder="Opisz: rodzaj, ciężkość, czas trwania..."
                    rows="3"
                  />
                  <ErrorMessage
                    name="adverseDescription"
                    component={ErrorText}
                  />
                </FormGroup>
              )}
            </QuestionSection>

            {/* Pytanie 3 */}
            <QuestionSection>
              <QuestionText>
                3. Ocena łatwości aplikacji (dawka, aplikator):
              </QuestionText>
              <p style={{ fontSize: "12px", color: "#888" }}>
                (1 – bardzo trudna, 5 – bardzo łatwa)
              </p>
              {renderScale("easeOfUse")}
              <ErrorMessage name="easeOfUse" component={ErrorText} />

              <FormGroup>
                <Field
                  name="easeOfUseComment"
                  component="textarea"
                  placeholder="Komentarz (opcjonalny)..."
                  rows="2"
                />
              </FormGroup>
            </QuestionSection>

            {/* Pytanie 4 */}
            <QuestionSection>
              <QuestionText>
                4. Długoterminowe efekty (np. osteointegracja po 3 miesiącach):
              </QuestionText>
              <p style={{ fontSize: "12px", color: "#888" }}>
                (1 – bardzo słabe, 5 – doskonałe)
              </p>
              {renderScale("longTermResults")}
              <ErrorMessage name="longTermResults" component={ErrorText} />

              <FormGroup>
                <Field
                  name="longTermResultsComment"
                  component="textarea"
                  placeholder="Komentarz (opcjonalny)..."
                  rows="2"
                />
              </FormGroup>
            </QuestionSection>

            {/* Pytanie 5 */}
            <QuestionSection>
              <QuestionText>5. Ogólna satysfakcja z wyrobu:</QuestionText>
              <p style={{ fontSize: "12px", color: "#888" }}>
                (1 – bardzo niska, 5 – bardzo wysoka)
              </p>
              {renderScale("overallSatisfaction")}
              <ErrorMessage name="overallSatisfaction" component={ErrorText} />

              <FormGroup>
                <Field
                  name="overallComment"
                  component="textarea"
                  placeholder="Komentarz (opcjonalny)..."
                  rows="2"
                />
              </FormGroup>
            </QuestionSection>

            <QuestionSection style={{ background: "#fdfdfd" }}>
              <QuestionText>Dodatkowe uwagi i kod zamówienia</QuestionText>
              <FormGroup>
                <label style={{ fontSize: "13px", marginBottom: "5px" }}>
                  Dowolne komentarze:
                </label>
                <Field name="additionalNotes" component="textarea" rows="3" />
              </FormGroup>
              <FormGroup style={{ marginTop: "15px" }}>
                <label style={{ fontSize: "13px", marginBottom: "5px" }}>
                  Kod zamówienia (traceability):
                </label>
                <Field
                  name="orderCode"
                  placeholder="Np. SZ/2024/001"
                  style={{ padding: "8px" }}
                />
              </FormGroup>
            </QuestionSection>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Przesyłanie..." : "Wyślij anonimową ankietę"}
            </SubmitButton>

            <p
              style={{
                textAlign: "center",
                fontSize: "12px",
                color: "#999",
                marginTop: "20px",
              }}>
              Dziękujemy za poświęcony czas! Dane zostaną przesłane do działu
              jakości.
            </p>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default PMCFSurvey;
