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
`

const BoxesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Box = styled.div`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding:1rem;
  border-radius: 12px;
`;
const WhatWeDo = () => {
  return (
    <Container>
      <Wrapper>
        <h2>We are involved in</h2>
        <BoxesWrapper>
          <Box>
            <p>
              Implementation of 3D printing technology using{" "}
              <b>biomaterials for implantology applications.</b>
            </p>
          </Box>
          <Box>
            <p>
              Development of a{" "}
              <b>
                complete series of medical devices and regenerative
                dermocosmetics with chitosan
              </b>{" "}
              for the effective treatment of civilization diseases such as
              androgenetic alopecia.
            </p>
          </Box>
          <Box>
            <p>
              Implementation of technology for the processing of{" "}
              <b>chitosan into multifunctional hydrogels of high purity</b>{" "}
              (including thermosensitive), <b>which are used in medicine</b>{" "}
              (implants, dressings, drug carriers) and in specialized
              microbiological applications.
            </p>
          </Box>
        </BoxesWrapper>
      </Wrapper>
    </Container>
  );
};

export default WhatWeDo;
