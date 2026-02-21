import styled from "styled-components";
import { device } from "../../assets/device";
import { pillIcon } from "../SignIn/pillIcon";

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
  @media ${device.tablet} {
    display: block;
  }
  h1 {
    color: #2d50dc;
    font-weight: 400;
    font-size: 3rem;
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
  transform: rotate(90deg);

  svg {
    filter: blur(17px);
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
const AuthSectionText = () => {
  return (
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
  );
};

export default AuthSectionText;
