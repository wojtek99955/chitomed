import ForgotPasswordForm from "../ForgotPasswordForm/ForgotPasswordForm";
import * as S from "../SignIn/Styles";
import AuthSectionText from "../SignUp/AuthSectionText";

const ForgotPassword = () => {
  return (
    <S.ForgotPasswordContainer>
      <ForgotPasswordForm />
      <AuthSectionText />
    </S.ForgotPasswordContainer>
  );
};

export default ForgotPassword;
