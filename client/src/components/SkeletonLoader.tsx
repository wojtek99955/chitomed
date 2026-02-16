import styled from "styled-components";


const Container = styled.div`
  background-color: #eeeeee;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  border-radius: 12px;
  overflow: hidden;

  &::before {
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #fff0, #fff, #fff0);
    content: "";
    animation: flash 1200ms linear infinite;
    position: absolute;
  }

  @keyframes flash {
    0% {
      left: -100%;
    }
    60%,
    100% {
      left: 110%;
    }
  }
`;

const SkeletonLoader = () => {
  return <Container />;
};

export default SkeletonLoader;
