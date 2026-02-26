import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/api";
import { useState } from "react";
import * as S from "./Styles";
import { logo } from "../SignIn/logo";
import Footer from "../SignIn/Footer";

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
    <S.Section>
      <S.LogoContainer>{logo}</S.LogoContainer>
      <S.Title>Reset Password</S.Title>
      <S.Description>
        Enter the email address associated with your account.
      </S.Description>

      {isSent ? (
        <S.SuccessMessage>
          If an account with this email exists, a password reset link has been
          sent.
          <br />
          Check your inbox (and spam folder).
        </S.SuccessMessage>
      ) : null}

      <Formik
        initialValues={{ email: "" }}
        validationSchema={ForgotSchema}
        onSubmit={(values) => mutation.mutate(values.email)}>
        {({ errors, touched, isSubmitting }) => (
          <S.StyledForm>
            <S.Input
              id="email"
              name="email"
              type="email"
              placeholder="Your email"
              $hasError={touched.email && !!errors.email}
              disabled={isSent || mutation.isPending}
            />
            <S.ErrorText name="email" component="div" />

            <S.Button
              type="submit"
              $loading={mutation.isPending || isSubmitting}
              $sent={isSent}
              disabled={mutation.isPending || isSubmitting || isSent}>
              {isSent
                ? "Link Sent"
                : mutation.isPending || isSubmitting
                  ? "Sending..."
                  : "Send Reset Link"}
            </S.Button>
          </S.StyledForm>
        )}
      </Formik>
      <S.BackLink to="/sign-in">Back to Sign In</S.BackLink>
      <Footer />
    </S.Section>
  );
};

export default ForgotPasswordForm;
