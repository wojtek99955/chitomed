import styled from "styled-components";
import img from "./img.webp";
import { device } from "../../../assets/device";
const Container = styled.section`
  background-image: url(${img});
  width: 100%;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 0;
  `;

const Main = styled.div`
  background-color: #332a85;
  display: block;
  max-width: 500px;
  padding: 2rem;
  opacity: 0.9;
  margin: 0 1rem;
  position: relative;
  z-index: 0;
  @media ${device.laptop} {
    margin: auto;
  }
  h1 {
    color: white;
  }
  p {
    color: white;
  }
`;

const Btn = styled.button`
  font-weight: 600;
  border: 2px solid white;
  transition: all 200ms;
  background-color: transparent;
  color: white;
  padding: 16px 40px;
  border-radius: 40px;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #322683;
  }
`;
const Opening = () => {
  return (
    <Container>
      <Main>
        <h1>Lorem, ipsum dolor.</h1>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam minus
          optio commodi? Obcaecati quibusdam cupiditate iusto voluptas, incidunt
          magni iure maxime perferendis corporis fuga tempora molestiae, sit
          odit unde nemo.
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, optio!
        </p>
        <br />
        <Btn>Learn more</Btn>
      </Main>
    </Container>
  );
};

export default Opening;
