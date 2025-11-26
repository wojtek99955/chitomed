import { Formik, Form, Field, ErrorMessage, useField } from "formik"; // Dodano useField
import * as Yup from "yup";
import styled from "styled-components";
import { IoMdMail, IoMdPin } from "react-icons/io";
import { HiPhone } from "react-icons/hi2";
import { device } from "../../assets/device";
import { ScrollReveal } from "../../animations/ScrollReveal";
import { Link } from "react-router-dom";

const FormContainer = styled.div`
  background: #ffffff10;
  padding: 2rem;
  border-radius: 16px;
  width: 100%;
  color: white;

  input,
  textarea {
    &::placeholder {
      font-weight: 300;
      color: #eeeeee;
    }
  }
`;

const Input = styled(Field)<{ $error?: boolean }>`
  width: 100%;
  padding: 0.8rem 1rem;
  margin-top: 0.3rem;
  border-radius: 8px;
  border: 1px solid ${({ $error }) => ($error ? "#ff8181" : "#58585A")};
  font-size: 1rem;
  transition: all 200ms;

  &:focus {
    outline: none;
    border-color: ${({ $error }) => ($error ? "#ff8181" : "#58585A")};
  }
`;

// --- POPRAWIONE STYLE DLA TextArea ---
// Zmieniamy to na czysty styled.textarea, bo logikę Formik przejmie TextAreaField
const StyledTextArea = styled.textarea<any>`
  width: 100%;
  padding: 0.8rem 1rem;
  margin-top: 0.3rem;
  border-radius: 8px;
  border: 1px solid ${({ $error }) => ($error ? "#ff8181" : "#58585A")};
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${({ $error }) => ($error ? "#ff8181" : "#58585A")};
  }
`;
// ----------------------------------------

const Label = styled.label`
  display: block;
  margin-top: 1rem;
  font-weight: 400;
  color: #444;
`;

const Button = styled.button`
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.9rem;
  background-color: #58585a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;

  &:hover:not(:disabled) {
    background-color: #4c4c4d;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.div`
  color: #ff8181;
  font-size: 0.9rem;
  margin-top: 0.4rem;
  min-height: 1.2em;
`;

// === Checkbox ===
const CheckboxContainer = styled.div`
  margin: 1.5rem 0 0.5rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.925rem;
  color: #444444;
  line-height: 1.5;
`;

const CheckboxLabel = styled.label`
  cursor: pointer;
  user-select: none;
`;

const StyledLink = styled(Link)`
  color: #444444;
  text-decoration: underline;
  font-weight: 500;
  &:hover {
    color: #444444;
  }
`;

const TextAreaField = ({ label, ...props }:any) => {

  const [field, meta] = useField(props);

  const hasError = meta.touched && meta.error;

  return (
    <>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <StyledTextArea
        id={props.id || props.name}
        $error={hasError}
        {...field} // Dodaje wartości, onChange, onBlur
        {...props} // Dodaje placeholder, itp.
      />
      {hasError ? <ErrorText>{meta.error}</ErrorText> : <ErrorText />}
    </>
  );
};

const ContactFormSchema = Yup.object().shape({
  name: Yup.string().required("Name or company is required"),
  email: Yup.string()
    .email("Please provide a valid email address")
    .required("Email is required"),
  message: Yup.string().trim().required("Message is required"),
  privacyPolicy: Yup.boolean()
    .oneOf([true], "You must accept the Privacy Policy")
    .required("You must accept the Privacy Policy"),
});

const Section = styled.section`
  max-width: 900px;
  margin: auto;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  align-items: center;
  @media ${device.tablet} {
    flex-direction: row;
  }
`;
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const ContactInfoEl = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  span {
    display: block;
    font-weight: 400;
  }
`;
const Pin = styled(IoMdPin)`
  font-size: 1.8rem;
  color: #58585a;
`;
const Mail = styled(IoMdMail)`
  font-size: 1.7rem;
  color: #58585a;
`;
const Phone = styled(HiPhone)`
  font-size: 1.7rem;
  color: #58585a;
`;

const ContactMail = () => {
  return (
    <Section id="contact">
      <ScrollReveal>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Get in Touch
        </h2>
      </ScrollReveal>

      <Wrapper>
        <ScrollReveal>
          <ContactInfo>
            <ContactInfoEl>
              <Phone />{" "}
              <strong>
                Call us <span>+48 444 444 444</span>
              </strong>
            </ContactInfoEl>
            <ContactInfoEl>
              <Mail />{" "}
              <strong>
                Email us <span>office@chitomed.com</span>
              </strong>
            </ContactInfoEl>
            <ContactInfoEl>
              <Pin />{" "}
              <strong>
                Address <span>J.H. Dąbrowskiego 77/A</span>
              </strong>
            </ContactInfoEl>
          </ContactInfo>
        </ScrollReveal>

        <ScrollReveal style={{ width: "100%" }}>
          <FormContainer>
            <Formik
              initialValues={{
                name: "",
                email: "",
                message: "",
                privacyPolicy: false,
              }}
              validationSchema={ContactFormSchema}
              onSubmit={(values, { setSubmitting, resetForm, setStatus }) => {
                console.log("Sent:", values);
                setTimeout(() => {
                  setStatus({ success: true });
                  resetForm();
                  setSubmitting(false);
                }, 1000);
                setTimeout(() => setStatus(null), 6000);
              }}>
              {({
                isSubmitting,
                status,
                touched,
                errors,
                setFieldValue,
                values,
              }) => (
                <Form noValidate>
                  <Label htmlFor="name">Name / company</Label>
                  <Input
                    name="name"
                    id="name"
                    placeholder="Name / company"
                    $error={touched.name && !!errors.name}
                  />
                  <ErrorMessage name="name" component={ErrorText} />

                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    $error={touched.email && !!errors.email}
                  />
                  <ErrorMessage name="email" component={ErrorText} />

                  <TextAreaField
                    label="Message"
                    name="message"
                    id="message"
                    placeholder="Message.."
                  />

                  <CheckboxContainer>
                    <input
                      type="checkbox"
                      id="privacyPolicy"
                      name="privacyPolicy"
                      checked={values.privacyPolicy}
                      onChange={(e) =>
                        setFieldValue("privacyPolicy", e.target.checked)
                      }
                      style={{
                        width: 18,
                        height: 18,
                        accentColor: "#58585a",
                        cursor: "pointer",
                        marginTop: 2,
                      }}
                    />
                    <CheckboxLabel htmlFor="privacyPolicy">
                      I agree to the{" "}
                      <StyledLink to="/privacy-policy">
                        Privacy Policy
                      </StyledLink>{" "}
                      and consent to processing my personal data.
                    </CheckboxLabel>
                  </CheckboxContainer>
                  {touched.privacyPolicy && errors.privacyPolicy && (
                    <ErrorText>{errors.privacyPolicy}</ErrorText>
                  )}

                  {status?.success && (
                    <div
                      style={{
                        color: "#27ae60",
                        margin: "1rem 0",
                        fontWeight: "600",
                        textAlign: "center",
                      }}>
                      Thank you! Your message has been sent
                    </div>
                  )}

                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send message"}
                  </Button>
                </Form>
              )}
            </Formik>
          </FormContainer>
        </ScrollReveal>
      </Wrapper>
    </Section>
  );
};

export default ContactMail;
