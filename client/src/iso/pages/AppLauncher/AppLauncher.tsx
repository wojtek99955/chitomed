import styled from "styled-components";
import { device } from "../../../assets/device"; 

const HubContainer = styled.div`
  min-height: 100vh;
  background-color: #f4f7f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Title = styled.h1`
  color: #2c50dc;
  margin-bottom: 40px;
  text-align: center;
  font-size: 28px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  width: 100%;
  max-width: 1000px;

  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
  }
`;

const Card = styled.a`
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-decoration: none;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #ddd;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(44, 80, 220, 0.15);
    border-color: #2c50dc;
  }
`;

const IconWrapper = styled.div<{ $color: string }>`
  font-size: 50px;
  margin-bottom: 20px;
  color: ${(props) => props.$color};
  background: ${(props) => props.$color + "15"}; // 15 to przezroczystość Hex
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const CardTitle = styled.h2`
  margin: 0 0 15px 0;
  font-size: 22px;
  color: #222;
`;

const CardDescription = styled.p`
  color: #666;
  font-size: 15px;
  line-height: 1.5;
  margin: 0;
`;

const Badge = styled.span`
  margin-top: 20px;
  background: #eee;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: #555;
`;


const AppLauncher = () => {
  return (
    <HubContainer>
      <Title>CHITOMED</Title>
      <Grid>
        <Card href="/dashboard">
          <IconWrapper $color="#4CAF50">
            <span>🎓</span>
          </IconWrapper>
          <CardTitle>Akademia Klienta</CardTitle>
          <CardDescription>
            Zarządzaj materiałami wideo, webinarami i biblioteką wiedzy dla
            lekarzy. Edytuj treści i monitoruj postępy.
          </CardDescription>
          <Badge>Materiały i Edukacja</Badge>
        </Card>

        <Card href="/iso/orders">
          <IconWrapper $color="#2c50dc">
            <span>📦</span>
          </IconWrapper>
          <CardTitle>ISO</CardTitle>
          <CardDescription>
            Zarządzaj procesem.
          </CardDescription>
          <Badge>Produkcja i Certyfikacja</Badge>
        </Card>
      </Grid>

      <div style={{ marginTop: "40px", color: "#999", fontSize: "12px" }}>
        Zalogowany jako Administrator 
      </div>
    </HubContainer>
  );
};

export default AppLauncher;
