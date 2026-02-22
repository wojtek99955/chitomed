import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { api } from "../../../api/api";
import { useState } from "react";
import { device } from "../../../assets/device";
import { logo } from "../../SignIn/logo";
import Footer from "../../SignIn/Footer";

const Section = styled.div`
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

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.2rem;
  font-size: 1.9rem;
`;

const Description = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1rem;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const Input = styled(Field)<{ $hasError?: boolean }>`
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

const ErrorText = styled(ErrorMessage)`
  color: #ff8181;
  font-size: 1rem;
  margin-top: 1rem;
  text-align: center;
  background: #f3f4f6;
  padding: 0.8rem;
  border-radius: 8px;
`;

const Button = styled.button<{ $loading?: boolean; $sent?: boolean }>`
  margin-top: 1.5rem;
  width: 100%;
  padding: 1rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 33px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${({ $loading }) => ($loading ? "not-allowed" : "pointer")};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
  transition: 0.2s;
  font-weight: 400;

  &:hover {
    transform: scale(1.01);
  }
  &:active {
    transform: scale(0.98);
  }
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

const BackLink = styled(Link)`
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

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  width: 50%;
  margin: auto;
  margin-bottom: 6rem;
`;


const ForgotSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPasswordForm = () => {
  const [isSent, setIsSent] = useState(false);

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    },
    onSuccess: () => {
      setIsSent(true);
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again later.";
      alert(message); // ← można później zamienić na ładny error div
    },
  });

  return (
    <Section>
      <LogoContainer>{logo}</LogoContainer>
        <Title>Reset Password</Title>
        <Description>
          Enter the email address associated with your account.
        </Description>

        {isSent ? (
          <SuccessMessage>
            If an account with this email exists, a password reset link has been
            sent.
            <br />
            Check your inbox (and spam folder).
          </SuccessMessage>
        ) : null}

        <Formik
          initialValues={{ email: "" }}
          validationSchema={ForgotSchema}
          onSubmit={(values) => mutation.mutate(values.email)}>
          {({ errors, touched, isSubmitting }) => (
            <StyledForm>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your email"
                $hasError={touched.email && !!errors.email}
                disabled={isSent || mutation.isPending}
              />
              <ErrorText name="email" component="div" />

              <Button
                type="submit"
                $loading={mutation.isPending || isSubmitting}
                $sent={isSent}
                disabled={mutation.isPending || isSubmitting || isSent}>
                {isSent
                  ? "Link Sent"
                  : mutation.isPending || isSubmitting
                    ? "Sending..."
                    : "Send Reset Link"}
              </Button>
            </StyledForm>
          )}
        </Formik>
        <BackLink to="/sign-in">Back to Sign In</BackLink>
        <Footer/>
    </Section>
  );
};

export default ForgotPasswordForm;
