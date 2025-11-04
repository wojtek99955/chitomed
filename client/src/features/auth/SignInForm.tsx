import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { device } from "../../assets/device";
import Logo from "../../assets/icons/Logo";

const FormContainer = styled.div`
  width: 90%;
  margin: 2rem auto;
  background: #ffffff10;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: white;
  @media ${device.tablet}{
    width: 450px;
  }
`;

const Input = styled(Field)`
  width: 100%;
  padding: 0.8rem 1rem;
  margin-top: 0.3rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #6542b3;
  }
`;

const Label = styled.label`
  display: block;
  margin-top: 1rem;
  font-weight: 500;
`;

const Button = styled.button`
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.9rem;
  background-color: #5d2fbd;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: #43238b;
  }
`;

const ErrorText = styled.div`
  color: #ffbaba;
  font-size: 0.9rem;
  margin-top: 0.2rem;
`;

// --- walidacja Yup ---
const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Nieprawidłowy adres e-mail")
    .required("Email jest wymagany"),
  password: Yup.string()
    .min(6, "Hasło musi mieć co najmniej 6 znaków")
    .required("Hasło jest wymagane"),
});

const LogoContainer = styled.div`
display: flex;
justify-content: center;
margin-bottom: 1rem;
`

const SignInForm = () => {
  return (
    <FormContainer>
        <LogoContainer><Logo/></LogoContainer>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Sign in</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        onSubmit={(values:any, { setSubmitting }:any) => {
          console.log("Dane logowania:", values);
          setTimeout(() => {
            setSubmitting(false);
            alert(`Zalogowano jako: ${values.email}`);
          }, 1000);
        }}>
        {({ isSubmitting }:any) => (
          <Form>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" placeholder="Wpisz email" />
            <ErrorMessage name="email" component={ErrorText} />

            <Label htmlFor="password">Hasło</Label>
            <Input type="password" name="password" placeholder="Wpisz hasło" />
            <ErrorMessage name="password" component={ErrorText} />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logowanie..." : "Zaloguj się"}
            </Button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default SignInForm;
