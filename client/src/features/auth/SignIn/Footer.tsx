import { Link } from "react-router-dom";
import * as S from "./Styles"; 

const Footer = () => {
  return (
    <S.FooterContainer>
      <div>2026 Chitomed. All rights reserved.</div>
      <Link to={"/privacy-policy"}>Privacy Policy & Terms</Link>
    </S.FooterContainer>
  );
}

export default Footer