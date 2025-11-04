import styled from "styled-components";

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
  padding: 1rem;
  border-radius: 12px;
  color:white;

  p{
    color:white;
  }
`;

const Boxes = styled.div`
display: grid;
gap:1rem;
grid-template-columns: 1fr 1fr 1fr;
`

const Name = styled.div`
  font-size: 1.6rem;
  color: #34136c;
  background-color: white;
  padding: 0.5rem;
  border-radius: 12px;
  margin: auto;
  width: fit-content;
  font-weight: 500;
  margin-bottom: 1rem;
`;
const Brands = () => {
  const brands = [
    {
      name: "Cyberbone",
      text: "Personalized, bioresorbable implants 3D printed with bone-forming biomaterials for solid bone tissue regeneration.",
    },
    {
      name: "NovaOss",
      text: "Thermosensitive chitosan matrix hydrogel with biomaterials for cancellous bone tissue regeneration.",
    },
    {
      name: "Implants4Kids",
      text: "Adaptive, bioresorbable, personalized 3D printed implant with bone-forming biomaterials for regeneration of cranial defects in children.",
    },
    {
      name: "HybridOss",
      text: "Personalized, bioresorbable 3D printed implants from bone-forming biomaterials with thermosensitive chitosan hydrogel content for complex bone regeneration in the most demanding surgical procedures and with metal components (e.g. dental implant screws) for procedures in maxillofacial surgery.",
    },
    {
      name: "StrongOss",
      text: "Personalized, bioresorbable implants 3D printed from bone-forming biomaterials for solid bone tissue regeneration with enhanced strength (CFF printing technology).",
    },
    {
      name: "RegCare",
      text: "Regenerative dermocosmetics based on chitosan.",
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
                <Name>{brand.name}</Name>
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
