import React from "react";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useSubscribeToNewsletter } from "../../features/newsletter/api/useAddSubscriber";
// ---- styles (bez zmian) ----
const Wrapper = styled.div`
  background-color: #f7f7f7;
`;
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
`;
const ErrorText = styled.div`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.4rem;
  text-align: left;
`;
const CheckboxWrapper = styled.label`
  display: flex;
  gap: 0.75rem;
  font-size: 0.925rem;
`;
const StyledCheckbox = styled(Field)`
  width: 18px;
  height: 18px;
`;
const StyledLink = styled(Link)`
  color: #58585a;
  font-weight: 600;
`;
const SubmitButton = styled.button`
  padding: 0.9rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background-color: #58585a;
  border-radius: 8px;
  border: none;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
const SuccessMessage = styled.div`
  color: #27ae60;
  font-weight: 600;
  margin-top: 1rem;
`;

// ---- validation ----
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  privacyPolicy: Yup.boolean().oneOf(
    [true],
    "You must accept the Privacy Policy"
  ),
});

const Newsletter: React.FC = () => {
  const {
    mutate: subscribe,
    isPending,
    isSuccess,
  } = useSubscribeToNewsletter();

  return (
    <Wrapper>
      <Container>
        <Title>Subscribe to Our Newsletter</Title>

        <Formik
          initialValues={{ email: "", privacyPolicy: false }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm, setStatus }) => {
            subscribe(
              { email: values.email },
              {
                onSuccess: () => {
                  setStatus({ success: true });
                  resetForm();
                },
              }
            );
          }}>
          {() => (
            <StyledForm noValidate>
              <InputWrapper>
                <StyledInput
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                />
                <ErrorMessage name="email" component={ErrorText} />
              </InputWrapper>

              <div>
                <CheckboxWrapper>
                  <StyledCheckbox type="checkbox" name="privacyPolicy" />
                  <span>
                    I accept the{" "}
                    <StyledLink to="/privacy-policy">Privacy Policy</StyledLink>
                  </span>
                </CheckboxWrapper>
                <ErrorMessage name="privacyPolicy" component={ErrorText} />
              </div>

              <SubmitButton type="submit" disabled={isPending}>
                {isPending ? "Subscribing..." : "Subscribe"}
              </SubmitButton>

              {isSuccess && (
                <SuccessMessage>
                  Thank you! You're now subscribed 🎉
                </SuccessMessage>
              )}
            </StyledForm>
          )}
        </Formik>
      </Container>
    </Wrapper>
  );
};

export default Newsletter;
