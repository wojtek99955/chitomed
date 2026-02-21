import styled from "styled-components";
import SignInForm from "../../features/auth/components/SignInForm";
import { pillIcon } from "./pillIcon";
import { device } from "../../assets/device";

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

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  display: none;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  @media ${device.tablet}{
    display: block;
  }
`;

const PillIcon = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    filter: blur(13px);
    width: 90%;
  }
`;

const Text = styled.div`
  padding: 2rem 2rem;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const SignIn = () => {
  return (
    <Container>
      <SignInForm />
      <Wrapper>
        <Text>
          <strong>NEXT-GEN BIOTECH</strong>
          <h1>Comprehensive Research and Clinical Case Studies</h1>
          <p>
            Unlock restricted clinical research and technical documentation by
            logging in.
          </p>
        </Text>
        <img
          src="https://chitomed-files.b-cdn.net/background-gradient-tiny.webp"
          alt="Background"
        />
        <PillIcon> {pillIcon}</PillIcon>
      </Wrapper>
    </Container>
  );
};

export default SignIn;
