import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import Logo from "../../assets/icons/Logo1";
import { device } from "../../assets/device";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../features/user/api/userApi";

const Container = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
`;

const Input = styled(Field)<{ $error?: boolean }>`
  width: 100%;
  padding: 0.8rem 1rem;
  margin-top: 0.3rem;
  border-radius: 8px;
  border: 1px solid ${({ $error }) => ($error ? "#ff8181" : "#ccc")};
  font-size: 1rem;
  transition: all 200ms;

  &:focus {
    outline: none;
    border-color: ${({ $error }) => ($error ? "#ff8181" : "#5069d4")};
  }
`;

const Label = styled.label`
  display: block;
  margin-top: 1rem;
  font-weight: 400;
  color: #444444;
`;

const Button = styled.button<{ $loading?: boolean }>`
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.9rem;
  background-color: #5069d4;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${({ $loading }) => ($loading ? "not-allowed" : "pointer")};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
  transition: 0.2s;

  &:hover {
    background-color: #3955ce;
  }
`;

const ErrorText = styled.div`
  color: #ff8181;
  font-size: 0.9rem;
  margin-top: 0.2rem;
`;

const ServerError = styled.div`
  color: #ff3c3c;
  font-size: 1rem;
  margin-top: 1rem;
  text-align: center;
  background: #ff818130;
  padding: 0.8rem;
  border-radius: 8px;
`;

const SuccessMessage = styled.div`
  color: #009a00;
  font-size: 1rem;
  margin-top: 1rem;
  text-align: center;
  background: rgba(0, 100, 0, 0.11);
  padding: 0.8rem;
  border-radius: 8px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const mutation = useMutation<any, Error, any>({
    mutationFn: signUp,
    onSuccess: () => {
      setServerError(null);
      setSuccessMessage(
          "Password has been sent to your email. Check your inbox (including spam folder).",
      );
    },
    onError: (error: any) => {
      let message = "An error occurred during registration. Please try again.";
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.response?.status === 409) {
        message = "An account with this email already exists.";
      } else if (error.response?.status === 429) {
        message = "Too many attempts. Please wait a moment.";
      } else if (error.message) {
        message = error.message;
      }
      setServerError(message);
      setSuccessMessage(null);
    },
  });

  return (
    <Container>
      <FormContainer>
        <LogoContainer>
          <Logo />
        </LogoContainer>

        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Sign Up</h2>

        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {serverError && <ServerError>{serverError}</ServerError>}

        {successMessage ? (
          <Button onClick={() => navigate("/sign-in")}>Sign In</Button>
        ) : (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={SignUpSchema}
            onSubmit={(values, { resetForm }) => {
              setServerError(null);
              mutation.mutate(values, {
                onSuccess: () => {
                  resetForm();
                },
              });
            }}>
            {({ errors, touched }) => (
              <Form>
                <Label htmlFor="email">Enter your email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  id="email"
                  $error={touched.email && !!errors.email}
                />
                <ErrorMessage name="email" component={ErrorText} />

                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  $loading={mutation.isPending}>
                  {mutation.isPending ? "Sending..." : "Send Password"}
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </FormContainer>
    </Container>
  );
};

export default SignUp;
