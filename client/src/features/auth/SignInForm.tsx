import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { device } from "../../assets/device";
import Logo from "../../assets/icons/Logo";
import { useMutation } from "@tanstack/react-query";
import {
  loginMutation, type LoginCredentials, type LoginResponse
} from "../../api/authApi";

import { useState } from "react";
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
    border-color: ${({ $error }) => ($error ? "#ff8181" : "#6542b3")};
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
  background-color: #5d2fbd;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${({ $loading }) => ($loading ? "not-allowed" : "pointer")};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
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

const ServerError = styled.div`
  color: #ff8181;
  font-size: 1rem;
  margin-top: 1rem;
  text-align: center;
  background: #ff818130;
  padding: 0.8rem;
  border-radius: 8px;
`;

const SuccessMessage = styled.div`
  color: #a0ffa0;
  font-size: 1rem;
  margin-top: 1rem;
  text-align: center;
  background: #00aa0030;
  padding: 0.8rem;
  border-radius: 8px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

// Walidacja Yup
const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Nieprawidłowy adres email")
    .required("Email jest wymagany"),
  password: Yup.string()
    .min(6, "Hasło musi mieć co najmniej 6 znaków")
    .required("Hasło jest wymagane"),
});

const SignInForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const mutation = useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: loginMutation,
    onSuccess: (data) => {
      // Zapis tokenu i użytkownika
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setServerError(null);
      setSuccessMessage("Zalogowano pomyślnie! Przekierowanie...");

      // Tutaj możesz zrobić redirect, np.:
      // window.location.href = "/dashboard";
      // lub użyć react-router: navigate("/dashboard");
    },
    onError: (error: any) => {
      // Błędy z backendu (np. 401)
      const message =
        error.response?.data?.message ||
        error.message ||
        "Błąd logowania. Spróbuj ponownie.";
      setServerError(message);
    },
  });

  return (
    <FormContainer>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Sign in</h2>

      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      {serverError && <ServerError>{serverError}</ServerError>}

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        onSubmit={(values, { setSubmitting }) => {
          setServerError(null);
          mutation.mutate(values);
          setSubmitting(false); // React Query zarządza loadingiem
        }}>
        {({ errors, touched }) => (
          <Form>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Wpisz email"
              id="email"
              $error={touched.email && !!errors.email}
            />
            <ErrorMessage name="email" component={ErrorText} />

            <Label htmlFor="password">Hasło</Label>
            <Input
              type="password"
              name="password"
              placeholder="Wpisz hasło"
              id="password"
              $error={touched.password && !!errors.password}
            />
            <ErrorMessage name="password" component={ErrorText} />

            <Button type="submit" $loading={mutation.isPending}>
              {mutation.isPending ? "Logowanie..." : "Sign in"}
            </Button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default SignInForm;
