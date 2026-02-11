import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { api } from "../../../api/api"; // your axios/fetch instance

// ── Styled Components ────────────────────────────────────────────────
const Container = styled.div`
  max-width: 450px;
  margin: 4rem auto;
  padding: 2.5rem;
  background: #ffffff10;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  color: white;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Input = styled(Field)<{ $error?: boolean }>`
  width: 100%;
  padding: 0.9rem;
  margin: 0.5rem 0 1rem;
  border: 1px solid ${({ $error }) => ($error ? "#ff8181" : "#555")};
  border-radius: 8px;
  background: #1e1e1e;
  color: white;
  font-size: 1rem;

  &:focus {
    border-color: #5069d4;
    outline: none;
  }
`;

const Button = styled.button<{ $loading?: boolean }>`
  width: 100%;
  padding: 1rem;
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
  color: #a0ffa0;
  text-align: center;
  margin: 1.5rem 0;
  padding: 1rem;
  background: #00aa0030;
  border-radius: 8px;
`;

// ── Validation Schema ────────────────────────────────────────────────
const ResetSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

// ── Main Component ───────────────────────────────────────────────────
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
                <label>New Password</label>
                <Input
                  type="password"
                  name="newPassword"
                  $error={touched.newPassword && !!errors.newPassword}
                />
                <ErrorMessage name="newPassword" component={ErrorText} />
              </div>

              <div>
                <label>Confirm Password</label>
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
