import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { device } from "../../../assets/device";
import Logo from "../../../assets/icons/Logo1";
import { useMutation } from "@tanstack/react-query";
import {
  loginMutation,
  type LoginCredentials,
  type LoginResponse,
} from "../api/authApi";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  h2{
    color:black;
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
    border-color: ${({ $error }) => ($error ? "#ff8181" : "#5069d41")};
  }
`;

const Label = styled.label`
  display: block;
  margin-top: 1rem;
  font-weight: 400;
  color: black;
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

const SignUpLink = styled(Link)`
  display: block;
  margin-top: 1rem;
  text-align: center;
  color: #5069d4;
  font-weight: 500;
  text-decoration: none;
  transition: 0.2s;

  &:hover {
    text-decoration: underline;
    color: #3955ce;
  }
`;

const ForgotPasswordLink = styled(Link)`
  display: block;
  margin: 1rem 0 0.5rem auto;
  text-align: right;
  color: #000000;
  text-decoration: none;
  text-align: center;
  transition: 0.2s;

  &:hover {
    text-decoration: underline;
  }
`;

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignInForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  let navigate = useNavigate();

  const mutation = useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: loginMutation,
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken);
      setServerError(null);
      setSuccessMessage("Logged in successfully! Redirecting...");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      let message = "Login failed. Please try again.";
      if (error.response?.status === 401) {
        message = "Incorrect email or password";
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }
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
        onSubmit={(values) => {
          setServerError(null);
          mutation.mutate(values);
        }}>
        {({ errors, touched }) => (
          <Form>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              id="email"
              $error={touched.email && !!errors.email}
            />
            <ErrorMessage name="email" component={ErrorText} />

            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              id="password"
              $error={touched.password && !!errors.password}
            />
            <ErrorMessage name="password" component={ErrorText} />
            <Button type="submit" $loading={mutation.isPending}>
              {mutation.isPending ? "Signing in..." : "Sign in"}
            </Button>
            <SignUpLink to="/sign-up">
              Don’t have an account? Sign up
            </SignUpLink>
            <ForgotPasswordLink to="/forgot-password">
              Forgot password
            </ForgotPasswordLink>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default SignInForm;
