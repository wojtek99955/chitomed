import { Link } from "react-router-dom";
import styled from "styled-components"
import { device } from "../../assets/device";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  font-size: 0.8rem;
  color: black;
  padding: 1rem;
  width: 100%;
  a {
    text-decoration: none;
    color: black;
    &:hover {
      text-decoration: underline;
    }
  }
  @media ${device.tablet} {
    width: 50%;
  }
`;
const Footer = () => {
  return (
    <Container>
      <div>2026 Chitomed. All rights reserved.</div>
      <Link to={"/privacy-policy"}>Privacy Policy & Terms</Link>
    </Container>
  );
}

export default Footer