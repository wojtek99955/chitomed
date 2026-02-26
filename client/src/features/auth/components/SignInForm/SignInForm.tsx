import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import {
  loginMutation,
  type LoginCredentials,
  type LoginResponse,
} from "../../api/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import * as S from "./Styles";
import { logo } from "../../SignIn/logo";

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
  const [showPassword, setShowPassword] = useState(false);
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
    <S.FormContainer>
      <S.LogoContainer>{logo}</S.LogoContainer>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Sign in</h2>

      {successMessage && <S.SuccessMessage>{successMessage}</S.SuccessMessage>}
      {serverError && <S.ServerError>{serverError}</S.ServerError>}

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        onSubmit={(values) => {
          setServerError(null);
          mutation.mutate(values);
        }}>
        {({ errors, touched }) => (
          <Form>
            <S.Input
              type="email"
              name="email"
              placeholder="Enter email"
              id="email"
              $error={touched.email && !!errors.email}
            />
            <S.PasswordWrapper>
              <S.Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                id="password"
                $error={touched.password && !!errors.password}
                style={{ marginBottom: "0.5rem" }}
              />
              <S.EyeIcon onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </S.EyeIcon>
            </S.PasswordWrapper>
            <ErrorMessage name="email" component={S.ErrorText} />
            <ErrorMessage name="password" component={S.ErrorText} />
            <S.Button
              type="submit"
              $loading={mutation.isPending}
              disabled={mutation.isPending}>
              {mutation.isPending && (
                <>
                  <S.Spinner />
                </>
              )}
              Sign in
            </S.Button>
            {mutation.isPending ? "Tak" : "nie"}

            <S.SignUpLink to="/sign-up">
              Don’t have an account? Sign up
              <S.Arrow />
            </S.SignUpLink>
            <S.ForgotPasswordLink to="/forgot-password">
              Forgot password
            </S.ForgotPasswordLink>
          </Form>
        )}
      </Formik>
    </S.FormContainer>
  );
};

export default SignInForm;
