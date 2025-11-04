import styled from "styled-components";
import { device } from "../../assets/device";

const Container = styled.section`
  padding: 1rem;
  h2 {
    text-align: center;
  }
`;

const Wrapper = styled.div`
  max-width: 1100px;
  margin: auto;
`;

const Block = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  @media ${device.tablet} {
    flex-direction: row;
  }
  gap: 2rem;
  img {
    width: 50%;
    border-radius: 12px;
  }
`;
const Chitosan = () => {
  return (
    <Container>
      <Wrapper>
        <h2>WHAT IS CHITOSAN MICROCRYSTALLINE?</h2>
        <Block>
          <div>
            <p>
              Chitosan is a biopolymer with unique properties, whose potential
              for specialized applications is very broad.
            </p>
            <br />
            <p>
              <b>This biopolymer exhibits antibacterial activity</b> against
              gram-positive and gram-negative bacterial strains, which has been
              proven in studies on many strains of bacteria, fungi and yeast.
            </p>
          </div>
          <img src="https://chitomed.com/index_files/details-2.png" alt="" />
        </Block>
        <br />
        <br />
        <Block>
          <img src="https://chitomed.com/index_files/_2.jpg" alt="" />
          <div>
            <p>
              In addition, it has the following properties:{" "}
              <b>
                biocompatibility, ability to activate macrophages and
                neutrophils, stimulation of cellular activity, uptake of growth
                factors, stimulation of cytokine production, promotion of
                angiogenesis processes and hydrophilicity.
              </b>
            </p>
            <br />
            <p>
              Chitosan exhibits biocompatibility, has been approved by the{" "}
              <b>Food and Drug Administration (FDA)</b> for use in dressings for
              hard-to-heal wounds, and is a suitable material for constructing
              bioscaffolds used for the reconstruction of human organs and
              tissues.
            </p>
          </div>
        </Block>
      </Wrapper>
    </Container>
  );
};

export default Chitosan;
