import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { IoMdMail, IoMdPin } from "react-icons/io";
import { HiPhone } from "react-icons/hi2";
import { device } from "../../assets/device";
import { ScrollReveal } from "../../animations/ScrollReveal";

// Styled components
const FormContainer = styled.div`
  background: #ffffff10;
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 100%;
  /* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); */
  color: white;

  input,
  textarea {
    &::placeholder {
      font-weight: 300;
      color: #eeeeee;
    }
    &::-webkit-input-placeholder {
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
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: all 200ms;
  border: 1px solid ${({ $error }) => ($error ? "#ff8181" : "#ccc")};

  &:focus {
    outline: none;
    border-color: #5d2fbd;
    border-color: ${({ $error }) => ($error ? "#ff8181" : "#5d2fbd")};
  }
  &::placeholder {
    font-weight: 200;
  }
`;

const TextArea = styled(Field)<{ $error?: boolean }>`
  width: 100%;
  padding: 0.8rem 1rem;
  margin-top: 0.3rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: all 200ms;
  border: 1px solid ${({ $error }) => ($error ? "#ff8181" : "#ccc")};
  resize: vertical;
  height: 4rem;

  &:focus {
    outline: none;
    border-color: #5d2fbd;
    border-color: ${({ $error }) => ($error ? "#ff8181" : "#5d2fbd")};
  }
`;

const Label = styled.label`
  display: block;
  margin-top: 1rem;
  font-weight: 500;
  color: #444444;
  font-weight: 400;
`;

const Button = styled.button`
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.9rem;
  background-color: #5d2fbd;
  background-color: #58585a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #43238b;
    background-color: #4c4c4d;
  }
`;

const ErrorText = styled.div`
  color: #ff8181;
  font-size: 0.9rem;
  margin-top: 0.2rem;
`;

const Section = styled.section`
max-width: 900px;
margin: auto;
`

const Wrapper = styled.div`
display: flex;
gap:2rem;
align-items: center;
flex-direction: column;
@media ${device.tablet}{
    flex-direction: row;
}
`

const ContactInfo = styled.div`
display: flex;
flex-direction: column;
gap:1rem;
`

const ContactInfoEl = styled.div`display: flex;
gap:1rem;
align-items:center;

span{
    display: block;
    font-weight: 400;
}`

const Pin = styled(IoMdPin)`
  font-size: 1.8rem;
  color: #34136c;
  color: #58585a;
`;
const Mail = styled(IoMdMail)`
  font-size: 1.7rem;
  color: #34136c;
  color: #58585a;
`;

const Phone = styled(HiPhone)`
  font-size: 1.7rem;
  color: #34136c;
  color: #58585a;
`;

// --- walidacja Yup ---
const ContactFormSchema = Yup.object().shape({
  name: Yup.string().required("Name or company is required"),
  email: Yup.string()
    .email("Please provide a valid email address")
    .required("Email is required"),
  message: Yup.string().required("Message is required"),
});

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
        <ScrollReveal style={{width:"100%"}}>
          <FormContainer>
            <Formik
              initialValues={{ name: "", email: "", message: "" }}
              validationSchema={ContactFormSchema}
              onSubmit={(values) => {
                console.log("Wiadomość kontaktowa:", values);
                // Możesz dodać logikę wysyłania wiadomości do serwera
              }}>
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <Label htmlFor="name">Name / company</Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Name / company"
                    id="name"
                    $error={touched.name && !!errors.name}
                  />
                  <ErrorMessage name="name" component={ErrorText} />

                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    id="email"
                    $error={touched.email && !!errors.email}
                  />
                  <ErrorMessage name="email" component={ErrorText} />

                  <Label htmlFor="message">Message</Label>
                  <TextArea
                    name="message"
                    rows={4}
                    placeholder="Message.."
                    autocomplete="off"
                    id="message"
                    $error={touched.message && !!errors.message}
                  />
                  <ErrorMessage name="message" component={ErrorText} />

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
