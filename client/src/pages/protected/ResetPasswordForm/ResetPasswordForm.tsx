import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { api } from "../../../api/api";

const Container = styled.div`
  max-width: 450px;
  margin: 4rem auto;
  padding: 2.5rem;
  border-radius: 16px;
  color: white;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Input = styled(Field)<{ $error?: boolean }>`
  width: 100%;
  padding: 0.8rem 1rem;
  margin-top: 0.3rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid ${({ $error }) => ($error ? "#ff8181" : "#ccc")};
  font-size: 1rem;
  transition: all 200ms;

  &:focus {
    outline: none;
    border-color: ${({ $error }) => ($error ? "#ff8181" : "#5069d41")};
  }
`;

const Button = styled.button<{ $loading?: boolean }>`
  width: 100%;
  padding: 1rem;
  margin-top: 2rem;
  background: #5069d4;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: ${({ $loading }) => ($loading ? "not-allowed" : "pointer")};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
`;

const ErrorText = styled.div`
  color: #ff8181;
  font-size: 0.9rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
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

const ResetSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

const ResetPasswordForm = () => {
  let navigate = useNavigate();
  const { token } = useParams();
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    const urlToken = token;
    if (!urlToken) {
      setServerError("Invalid or missing reset token.");
      return;
    }
  }, [token]);

  if (!token && !success) {
    return (
      <Container>
        <Title>Reset Password</Title>
        <ErrorText>{serverError || "Loading..."}</ErrorText>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Set New Password</Title>

      {success ? (
        <SuccessMessage>
          Password has been changed successfully! <br />
          Redirecting to sign in...
        </SuccessMessage>
      ) : (
        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          validationSchema={ResetSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setServerError(null);
            try {
              await api.post("/auth/reset-password", {
                token,
                newPassword: values.newPassword,
              });

              setSuccess(true);
              setTimeout(() => navigate("/sign-in"), 2500);
            } catch (err: any) {
              setServerError(
                err.response?.data?.message ||
                  "Something went wrong. The token may have expired.",
              );
            } finally {
              setSubmitting(false);
            }
          }}>
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div>
                <Input
                  type="password"
                  name="newPassword"
                  $error={touched.newPassword && !!errors.newPassword}
                />
                <ErrorMessage name="newPassword" component={ErrorText} />
              </div>

              <div>
                <Input
                  type="password"
                  name="confirmPassword"
                  $error={touched.confirmPassword && !!errors.confirmPassword}
                />
                <ErrorMessage name="confirmPassword" component={ErrorText} />
              </div>

              {serverError && <ErrorText>{serverError}</ErrorText>}

              <Button
                type="submit"
                $loading={isSubmitting}
                disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Set New Password"}
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Container>
  );
};

export default ResetPasswordForm;
