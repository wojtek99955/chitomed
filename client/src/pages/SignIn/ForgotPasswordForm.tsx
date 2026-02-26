import ForgotPasswordForm from "../protected/ForgotPassword/ForgotPasswordForm";
import AuthSectionText from "../SignUp/AuthSectionText";
import * as S from "./Styles";

const ForgotPassword = () => {
  return (
    <S.ForgotPasswordContainer>
      <ForgotPasswordForm />
      <AuthSectionText />
    </S.ForgotPasswordContainer>
  );
};

export default ForgotPassword;
