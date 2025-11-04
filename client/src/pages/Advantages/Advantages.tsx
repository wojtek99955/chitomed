import styled from "styled-components";
import { IoIosCheckmarkCircle } from "react-icons/io";

const Container = styled.section`
  padding: 1rem;
  h2 {
    text-align: center;
    text-transform: uppercase;
  }
`;

const Wrapper = styled.div`
  max-width: 700px;
  margin: auto;
`;

const Content = styled.div`
li{
    font-size: 1.2rem;
    margin-bottom: .9rem;
    display: flex;
    gap:.5rem;
}
`

const Checkmark = styled(IoIosCheckmarkCircle)`
  font-size: 2.2rem;
  color: #34136c;
`;

const Advantages = () => {

    const advantages = [
      "An excellent team of competent scientists constantly improving the technology of chitosan production and its industrial applications.",
      "High quality and purity of raw material and products.",
      "Low cost of producing microcrystalline chitosan as raw material and first lines of final products using it.",
      "Mobility of the production line.",
    ];
  return (
    <Container>
      <Wrapper>
        <h2>COMPETITIVE ADVANTAGES OF CHITOMED</h2>
        <Content>
          <ul>
            {advantages.map((item, index) => (
              <li key={index}>
                <div><Checkmark/></div>
                {item}
              </li>
            ))}
          </ul>
        </Content>
      </Wrapper>
    </Container>
  );
};

export default Advantages;
