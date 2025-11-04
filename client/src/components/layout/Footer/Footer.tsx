import styled from "styled-components"
import { IoMdPin } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa6";

const FooterContainer = styled.footer`
  background-color: #34136c;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  padding:1rem;
`;

const Wrapper = styled.div`
max-width: 1100px;
margin: auto;
display: flex;
justify-content: space-between;
`

const Pin = styled(IoMdPin)`
font-size: 1.8rem;
`
const Mail = styled(IoMdMail)`
  font-size: 1.8rem;
  color:white;
`;

const LinkedIn = styled(FaLinkedin)`
  font-size: 1.8rem;
  color: white;
`;
const CompanyData = styled.div`
color:white;
display: flex;
gap:.5rem;
`

const Data = styled.div`

`

const MailSection = styled.div`

`

const LinkedInSection = styled.div`
`

const Row = styled.div`
  text-decoration: none;
  a {
    text-decoration: none;
    color: white;
    display: flex;
    align-items: center;
    gap:.5rem;
  }
`;
const Footer = () => {
  return (
    <FooterContainer>
      <Wrapper>
        <CompanyData>
          <Pin />
          <Data>
            <div>Chitomed P.S.A.</div>
            <div>Nobel Tower, ul. J.H.Dąbrowskiego 77/A</div>
            <div>60-529 Poznań</div>
            <div>NIP 7812083505</div>
            <div>KRS 0001152507</div>
          </Data>
        </CompanyData>
        <Row>
          <MailSection>
            <a href="mailto:office@chitomed.com">
              <Mail />
              office@chitomed.com
            </a>
          </MailSection>
          <LinkedInSection>
            <a href="/">
              <LinkedIn />
              Chitomed on LinkedIn
            </a>
          </LinkedInSection>
        </Row>
      </Wrapper>
    </FooterContainer>
  );
}

export default Footer