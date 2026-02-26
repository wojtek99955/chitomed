import styled from "styled-components";
import { device } from "../../../assets/device";

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  font-size: 0.8rem;
  color: black;
  padding: 1rem;
  width: 100%;
  gap: 0.4rem;
  a {
    text-decoration: none;
    color: black;
    &:hover {
      text-decoration: underline;
    }
  }
  @media ${device.tablet} {
    width: 50%;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const ForgotPasswordContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;

  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
  }
  strong {
    font-weight: 500;
  }
  p {
    font-size: 1.3rem;
  }
`;

export const SignInContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;

  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
  }
  strong {
    font-weight: 500;
  }
  p {
    font-size: 1.3rem;
  }
`;
