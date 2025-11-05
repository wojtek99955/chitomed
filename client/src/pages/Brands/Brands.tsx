import styled from "styled-components";
import { device } from "../../assets/device";
import regcare from "../../assets/icons/regcare.png";
import novaoss from "../../assets/icons/novaoss.png";
const Container = styled.section`
  padding: 1rem;
  h2 {
    text-align: center;
    text-transform: uppercase;
  }
`;

const Wrapper = styled.div`
  max-width: 1100px;
  margin: auto;
`;

const Box = styled.div`
  background-color: #34136c;
  padding: 2rem;
  border-radius: 12px;
  color: white;

  p {
    color: white;
  }
`;

const Boxes = styled.div`
  display: grid;
  gap: 1rem;
  max-width: 1100px;
  margin: auto;
  grid-template-columns: 1fr;
  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Name = styled.div`
  color: #34136c;
  background-color: white;
  padding: 0.5rem;
  border-radius: 12px;
  margin: auto;
  width: fit-content;
  font-weight: 500;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 9rem;
  }
`;
const Brands = () => {
  const brands = [
    // {
    //   name: "Cyberbone",
    //   text: "Personalized, bioresorbable implants 3D printed with bone-forming biomaterials for solid bone tissue regeneration.",
    // },
    {
      name: "NovaOss",
      text: "Thermosensitive chitosan matrix hydrogel with biomaterials for cancellous bone tissue regeneration.",
      logo: novaoss,
    },
    // {
    //   name: "Implants4Kids",
    //   text: "Adaptive, bioresorbable, personalized 3D printed implant with bone-forming biomaterials for regeneration of cranial defects in children.",
    // },
    // {
    //   name: "HybridOss",
    //   text: "Personalized, bioresorbable 3D printed implants from bone-forming biomaterials with thermosensitive chitosan hydrogel content for complex bone regeneration in the most demanding surgical procedures and with metal components (e.g. dental implant screws) for procedures in maxillofacial surgery.",
    // },
    // {
    //   name: "StrongOss",
    //   text: "Personalized, bioresorbable implants 3D printed from bone-forming biomaterials for solid bone tissue regeneration with enhanced strength (CFF printing technology).",
    // },
    {
      name: "RegCare",
      logo: regcare,
      text: "Regenerative dermocosmetics based on chitosan.",
    },
    {
      name: "NovaHemo",
      text:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, pariatur",
    },
  ];
  return (
    <Container>
      <h2>Chitomed brands</h2>
      <Wrapper>
        <Boxes>
          {brands.map((brand: any) => {
            return (
              <Box key={brand.name}>
                <Name>
                  <Logo>
                    {brand.logo ? <img src={brand.logo} alt="" /> : brand.name}
                  </Logo>
                </Name>

                <p>{brand.text}</p>
              </Box>
            );
          })}
        </Boxes>
      </Wrapper>
    </Container>
  );
};

export default Brands;
