import styled from "styled-components";
import SignInForm from "../../features/auth/components/SignInForm";
import { device } from "../../assets/device";
import AuthSectionText from "../SignUp/AuthSectionText";

const Container = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;

  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
  }

  h1 {
    color: #2d50dc;
    font-weight: 400;
    font-size: 3rem;
  }
  strong {
    font-weight: 500;
  }
  p {
    font-size: 1.3rem;
  }
`;

const SignIn = () => {
  return (
    <Container>
      <SignInForm />
      <AuthSectionText />
    </Container>
  );
};

export default SignIn;
