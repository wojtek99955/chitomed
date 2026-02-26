import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { api } from "../../../api/api";
import * as S from "./Styles";

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
      <S.Container>
        <S.Title>Reset Password</S.Title>
        <S.ErrorText>{serverError || "Loading..."}</S.ErrorText>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Title>Set New Password</S.Title>

      {success ? (
        <S.SuccessMessage>
          Password has been changed successfully! <br />
          Redirecting to sign in...
        </S.SuccessMessage>
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
                <S.Input
                  type="password"
                  name="newPassword"
                  $error={touched.newPassword && !!errors.newPassword}
                />
                <ErrorMessage name="newPassword" component={S.ErrorText} />
              </div>

              <div>
                <S.Input
                  type="password"
                  name="confirmPassword"
                  $error={touched.confirmPassword && !!errors.confirmPassword}
                />
                <ErrorMessage name="confirmPassword" component={S.ErrorText} />
              </div>

              {serverError && <S.ErrorText>{serverError}</S.ErrorText>}

              <S.Button
                type="submit"
                $loading={isSubmitting}
                disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Set New Password"}
              </S.Button>
            </Form>
          )}
        </Formik>
      )}
    </S.Container>
  );
};

export default ResetPasswordForm;
