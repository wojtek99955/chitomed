import styled from "styled-components";
import img from "./img.webp";
import { device } from "../../../assets/device";
import { useRef } from "react";
import { ScrollReveal } from "../../../animations/ScrollReveal";
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
  background-color: #58585a;
  display: block;
  max-width: 500px;
  border-radius: 12px;
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

const Btn = styled.a`
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

  const containerRef = useRef<any>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const sectionBottom =
        containerRef.current.offsetTop + containerRef.current.offsetHeight;

      window.scrollTo({
        top: sectionBottom -100,
        behavior: "smooth",
      });
    }
  };

  return (
    <Container ref={containerRef}>
      <ScrollReveal style={{height:"100%"}}>
        <Main>
          <h1>No limits biomaterials for bone regeneration</h1>
          <br />
          <p>Especially for medical and pharmaceutical applications</p>
          <br />
          <br />
          <Btn onClick={handleScroll}>Learn more</Btn>
        </Main>
      </ScrollReveal>
    </Container>
  );
};

export default Opening;
