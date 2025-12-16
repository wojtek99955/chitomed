import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { device } from "../../../assets/device";
import Logo from "../../../assets/icons/Logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useMutation } from "@tanstack/react-query";
// import {
//   loginMutation,
//   type LoginCredentials,
//   type LoginResponse,
// } from "../api/authApi";

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const Container = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 90%;
  margin: 2rem auto;
  background: #ffffff10;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  color: white;

  @media ${device.tablet} {
    width: 450px;
  }
`;

const Input = styled(Field)<{ $error?: boolean }>`
  width: 100%;
  padding: 0.8rem 1rem;
  margin-top: 0.3rem;
  border-radius: 8px;
  border: 1px solid ${({ $error }) => ($error ? "#ff8181" : "#ccc")};
  font-size: 1rem;
  transition: all 200ms;

  &:focus {
    outline: none;
    border-color: ${({ $error }) => ($error ? "#ff8181" : "#6542b3")};
  }
`;

const Label = styled.label`
  display: block;
  margin-top: 1rem;
  font-weight: 400;
  color: #444444;
`;

const Button = styled.button<{ $loading?: boolean }>`
  margin-top: 1.5rem;
  width: 100%;
  padding: 0.9rem;
  background-color: #5d2fbd;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${({ $loading }) => ($loading ? "not-allowed" : "pointer")};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
  transition: 0.2s;

  &:hover {
    background-color: #43238b;
  }
`;

const ErrorText = styled.div`
  color: #ff8181;
  font-size: 0.9rem;
  margin-top: 0.2rem;
`;

// const ServerError = styled.div`
//   color: #ff8181;
//   font-size: 1rem;
//   margin-top: 1rem;
//   text-align: center;
//   background: #ff818130;
//   padding: 0.8rem;
//   border-radius: 8px;
// `;

// const SuccessMessage = styled.div`
//   color: #a0ffa0;
//   font-size: 1rem;
//   margin-top: 1rem;
//   text-align: center;
//   background: #00aa0030;
//   padding: 0.8rem;
//   border-radius: 8px;
// `;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const Signup = () => {
  let navigate = useNavigate();
  //   const [serverError, setServerError] = useState<string | null>(null);
  //   const [successMessage, setSuccessMessage] = useState<string | null>(null);
  //   let navigate = useNavigate();

  //   const mutation = useMutation<LoginResponse, Error, LoginCredentials>({
  //     mutationFn: loginMutation,
  //     onSuccess: (data) => {
  //       localStorage.setItem("token", data.token);
  //       setServerError(null);
  //       setSuccessMessage("Logged in successfully! Redirecting...");
  //       navigate("/dashboard");
  //     },
  //     onError: (error: any) => {
  //       let message = "Login failed. Please try again.";
  //       if (error.response?.status === 401) {
  //         message = "Incorrect email or password";
  //       } else if (error.response?.data?.message) {
  //         message = error.response.data.message;
  //       } else if (error.message) {
  //         message = error.message;
  //       }
  //       setServerError(message);
  //     },
  //   });

  const [isSuccess, setIsSuccess] = useState(false);

  const fakeSubmit = () => {
    setIsSuccess(true);
  };

  return (
    <Container>
      {!isSuccess && (
        <FormContainer>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Sign up</h2>

          {/* {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      {serverError && <ServerError>{serverError}</ServerError>} */}

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={SignInSchema}
            onSubmit={(_values) => {
              //   setServerError(null);
              //   mutation.mutate(values);
              fakeSubmit();
            }}>
            {({ errors, touched }) => (
              <Form>
                <Label htmlFor="email">Enter your email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  id="email"
                  $error={touched.email && !!errors.email}
                />
                <ErrorMessage name="email" component={ErrorText} />
                <Button
                  type="submit"
                  // $loading={mutation.isPending}
                >
                  {/* {mutation.isPending ? "..." : "Sign in"} */}
                  Send password
                </Button>
              </Form>
            )}
          </Formik>
        </FormContainer>
      )}
      {isSuccess && (
        <>
          <FormContainer>
            <LogoContainer>
              <Logo />
            </LogoContainer>
            <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
              Sign up
            </h2>
            <p>Your password has been sent to your email!</p>
            <Button
              onClick={()=>navigate("/sign-in")}
              // $loading={mutation.isPending}
            >
              {/* {mutation.isPending ? "..." : "Sign in"} */}
              Sign in{" "}
            </Button>
          </FormContainer>
        </>
      )}
    </Container>
  );
};

export default Signup;
