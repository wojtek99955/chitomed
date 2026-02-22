import styled from 'styled-components';
import ForgotPasswordForm from '../protected/ForgotPassword/ForgotPasswordForm'
import { device } from '../../assets/device';
import AuthSectionText from '../SignUp/AuthSectionText';

const Container = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;

  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
  }
  strong {
    font-weight: 500;
  }
  p {
    font-size: 1.3rem;
  }
`;
const ForgotPassword = () => {
  
  return (
    <Container><ForgotPasswordForm/><AuthSectionText/></Container>
  )
}

export default ForgotPassword