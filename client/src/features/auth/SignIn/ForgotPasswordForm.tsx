import AuthSectionText from "../SignUp/AuthSectionText";
import ForgotPasswordForm from "../ForgotPasswordForm/ForgotPasswordForm";
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
