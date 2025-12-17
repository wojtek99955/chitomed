import styled from "styled-components";
import SignInForm from "../../features/auth/components/SignInForm";
import { useEffect } from "react";
import axios from "axios";
// import { useEffect } from "react";
// import axios from "axios";

const Container = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignIn = () => {
  return (
    <Container>
      <SignInForm />
    </Container>
  );
};

export default SignIn;
