import styled from "styled-components"
import { device } from "../../assets/device"

const Container = styled.section`
padding:1rem;
h2{
    text-align: center;
}
`

const Wrapper = styled.div`
max-width: 1100px;
margin: auto;
display: flex;
align-items: center;
flex-direction: column;
gap:2rem;
@media ${device.tablet}{
    flex-direction: row;
}
img{
    border-radius:12px;
    width: 100%;
}
`

const Text = styled.div`

`
const About = () => {
  return (
    <Container>
      <h2>About Chitomed</h2>
      <Wrapper>
        <Text id="about">
          <p>
            We develop and implement innovative technological solutions based on
            biomaterials for the pharmaceutical, medical, and cosmetics
            industries.
          </p>
          <br />
          <p>We specialize in chitosan and microcrystalline chitosan.</p>
          <br />
          <p>
            We cooperate with scientists who have studied chitosan and its
            processing technologies in detail for many years.
          </p>
        </Text>
        <img src="https://chitomed.com/index_files/_1.jpg" alt="" />
      </Wrapper>
      <br />
    </Container>
  );
}

export default About