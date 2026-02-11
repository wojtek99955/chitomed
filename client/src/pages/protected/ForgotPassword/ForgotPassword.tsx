import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { api } from "../../../api/api";

const Section = styled.div`
display: flex;
justify-content: center;
align-items: center;
min-height: 100vh;
`
const Container = styled.div`
  max-width: 450px;
  margin: 3rem auto;
  padding: 2rem;
  background: #ffffff10;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  color: white;

  @media (max-width: 500px) {
    margin: 2rem 1rem;
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.8rem;
`;

const Description = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1rem;
  color:black;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color:black;
`;

const Input = styled(Field)<{ $hasError?: boolean }>`
  width: 100%;
  padding: 0.8rem 1rem;
  margin-top: 0.3rem;
  border-radius: 8px;
  border: 1px solid ${({ $hasError }) => ($hasError ? "#ff8181" : "#ccc")};
  font-size: 1rem;
  transition: all 200ms;

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? "#ff8181" : "#5069d41")};
  }
`;

const ErrorText = styled(ErrorMessage)`
  color: #ff8181;
  font-size: 0.85rem;
  margin-top: 0.4rem;
  margin-left: 0.2rem;
`;

const Button = styled.button<{ $loading?: boolean }>`
  margin-top: 1.5rem;
  padding: 0.95rem;
  background: #5069d4;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: ${({ $loading }) => ($loading ? "not-allowed" : "pointer")};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
  transition:
    background 0.2s,
    transform 0.1s;

  &:hover:not(:disabled) {
    background: #3955ce;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }
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

const ForgotSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});


const ForgotPasswordForm = () => {
  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    },
    onSuccess: () => {
      alert(
        "If an account with this email exists, a password reset link has been sent.",
      );
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again later.";
      alert(message);
    },
  });

  return (
    <Section>
      <Container>
        <Title>Reset Password</Title>
        <Description>
          Enter the email address associated with your account.
        </Description>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={ForgotSchema}
          onSubmit={(values) => mutation.mutate(values.email)}>
          {({ errors, touched, isSubmitting }) => (
            <StyledForm>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your email"
                $hasError={touched.email && !!errors.email}
              />
              <ErrorText name="email" component="div" />

              <Button
                type="submit"
                $loading={mutation.isPending || isSubmitting}
                disabled={mutation.isPending || isSubmitting}>
                {mutation.isPending || isSubmitting
                  ? "Sending..."
                  : "Send Password"}
              </Button>
            </StyledForm>
          )}
        </Formik>

        <BackLink to="/sign-in">Sign In</BackLink>
      </Container>
    </Section>
  );
};

export default ForgotPasswordForm;
