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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  color: white;
  @media ${device.tablet} {
    width: 450px;
  }
  input {
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
    border-color: #6542b3;
    border-color: ${({ $error }) => ($error ? "#ff8181" : "#6542b3")};
  }
  &::placeholder {
    font-weight: 200;
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
  color: #ff8181;
  font-size: 0.9rem;
  margin-top: 0.2rem;
`;

// --- walidacja Yup ---
const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const SignInForm = () => {
  return (
    <FormContainer>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Sign in</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        onSubmit={(values: any) => {
          console.log("Dane logowania:", values);
        }}>
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Label htmlFor="email">E-mail</Label>
            <Input
              type="email"
              name="email"
              placeholder="Type e-mail"
              id="email"
              $error={touched.email && !!errors.email}
            />
            <ErrorMessage name="email" component={ErrorText} />

            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Type password"
              id="password"
              $error={touched.password && !!errors.password}
            />
            <ErrorMessage name="password" component={ErrorText} />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default SignInForm;
