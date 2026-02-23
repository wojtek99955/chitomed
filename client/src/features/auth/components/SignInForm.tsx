import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { device } from "../../../assets/device";
import { useMutation } from "@tanstack/react-query";
import {
  loginMutation,
  type LoginCredentials,
  type LoginResponse,
} from "../api/authApi";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../../../pages/SignIn/logo";
import { FaArrowRight } from "react-icons/fa6";
import { Loader2 } from "lucide-react";

const FormContainer = styled.div`
  width: 95%;
  color: white;
  margin: auto;
  @media ${device.tablet} {
    width: 400px;
    padding: 2rem;
  }
  @media ${device.laptop} {
    width: 550px;
    padding: 2rem;
  }
  h2 {
    color: black;
    font-weight: 400;
  }
`;

const Input = styled(Field)<{ $error?: boolean }>`
  width: 100%;
  padding: 0.9rem 1rem;
  margin-top: 0.3rem;
  border-radius: 33px;
  margin-bottom: 0.8rem;
  border: 1px solid ${({ $error }) => ($error ? "#ff8181" : "#DCDCE1")};
  font-size: 1rem;
  transition: all 200ms;

  &:focus {
    outline: none;
    border-color: ${({ $error }) => ($error ? "#ff8181" : "#2D50DC")};
  }
  &::placeholder {
    text-align: center;
  }
`;

const Button = styled.button<{ $loading?: boolean }>`
  margin-top: 1.5rem;
  width: 100%;
  padding: 1rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 33px;
  font-size: 1rem;
  font-weight: 600;
  position: relative;
  cursor: ${({ $loading }) => ($loading ? "not-allowed" : "pointer")};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
  transition: 0.2s;
  font-weight: 400;
  position: relative;
  color: ${({ $loading }) => ($loading ? "transparent" : "white")};

  &:hover {
    transform: scale(1.01);
  }
  &:active {
    transform: scale(0.98);
  }
`;

const ErrorText = styled.div`
  color: #ff8181;
  font-size: 1rem;
  margin-top: 1rem;
  text-align: center;
  background: #f3f4f6;
  padding: 0.8rem;
  border-radius: 8px;
`;

const ServerError = styled.div`
  color: #ff8181;
  font-size: 1rem;
  margin-top: 1rem;
  text-align: center;
  background: #f3f4f6;
  padding: 0.8rem;
  border-radius: 8px;
  margin-bottom: 1rem;
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
  width: 50%;
  margin: auto;
  margin-bottom: 6rem;
`;

const SignUpLink = styled(Link)`
  display: flex;
  margin: auto;
  text-align: center;
  justify-content: center;
  margin-top: 1rem;
  align-items: center;
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

const Arrow = styled(FaArrowRight)`
  font-size: 1rem;
  margin-left: 0.5rem;
`;

const Spinner = styled(Loader2)`
  width: 27px;
  height: 27px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  animation: spin 3s linear infinite;
  z-index: 1000;
  color:white !important;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
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
      <LogoContainer>{logo}</LogoContainer>
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
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              id="email"
              $error={touched.email && !!errors.email}
            />
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              id="password"
              $error={touched.password && !!errors.password}
            />
            <ErrorMessage name="email" component={ErrorText} />
            <ErrorMessage name="password" component={ErrorText} />
            <Button
              type="submit"
              $loading={mutation.isPending}
              disabled={mutation.isPending}>
              {mutation.isPending && (
                <>
                  <Spinner />
                </>
              )}
              Sign in
            </Button>
            {mutation.isPending? "Tak":"nie"}

            <SignUpLink to="/sign-up">
              Don’t have an account? Sign up
              <Arrow />
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
