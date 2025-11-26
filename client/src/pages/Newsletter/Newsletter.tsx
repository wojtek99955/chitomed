import React from "react";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

// Styled components
const Container = styled.section`
  padding: 4rem 1rem;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  text-transform: uppercase;
  margin-bottom: 2rem;
  letter-spacing: 1px;
  color: #333;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled(Field)`
  width: 100%;
  padding: 0.9rem 1.2rem;
  font-size: 1rem;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #58585a;
    box-shadow: 0 0 0 3px rgba(88, 88, 90, 0.1);
  }
`;

const ErrorText = styled.div`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.4rem;
  text-align: left;
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.925rem;
  color: #444;
  cursor: pointer;
  text-align: left;
  user-select: none;
  line-height: 1.5;
`;

const StyledCheckbox = styled(Field)`
  margin-top: 0.2rem;
  width: 18px;
  height: 18px;
  accent-color: #58585a;
`;

const StyledLink = styled(Link)`
  color: #58585a;
  text-decoration: underline;
  font-weight: 600;

  &:hover {
    color: #3a3a3b;
  }
`;

const SubmitButton = styled.button`
  padding: 0.9rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background-color: #58585a;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #4c4c4d;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 1rem;
  animation: fadeIn 0.5s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Yup validation schema – teraz z wymaganą akceptacją!
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  privacyPolicy: Yup.boolean()
    .oneOf([true], "You must accept the Privacy Policy to continue")
    .required("You must accept the Privacy Policy"),
});

const Newsletter: React.FC = () => {
  return (
    <Container>
      <Title>Subscribe to Our Newsletter</Title>

      <Formik
        initialValues={{
          email: "",
          privacyPolicy: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm, setStatus }) => {
          setTimeout(() => {
            console.log("Subscribed:", values.email);
            setStatus({ success: true });
            resetForm();
            setSubmitting(false);

            // Auto-hide success message
            setTimeout(() => setStatus({ success: false }), 5000);
          }, 1000);
        }}>
        {({ isSubmitting, status }) => (
          <StyledForm noValidate>
            <InputWrapper>
              <StyledInput
                type="email"
                name="email"
                placeholder="Enter your email address"
                autoComplete="email"
              />
              <ErrorMessage name="email" component={ErrorText} />
            </InputWrapper>

            {/* Checkbox z akceptacją polityki prywatności */}
            <div>
              <CheckboxWrapper>
                <StyledCheckbox type="checkbox" name="privacyPolicy" />
                <span>
                  By subscribing, I accept the{" "}
                  <StyledLink to="/privacy-policy">Privacy Policy</StyledLink>{" "}
                  and agree to receive newsletters.
                </span>
              </CheckboxWrapper>
              <ErrorMessage name="privacyPolicy" component={ErrorText} />
            </div>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </SubmitButton>

            {status?.success && (
              <SuccessMessage>Thank you! You're now subscribed</SuccessMessage>
            )}
          </StyledForm>
        )}
      </Formik>
    </Container>
  );
};

export default Newsletter;
