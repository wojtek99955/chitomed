import SignInForm from "../../features/auth/components/SignInForm";
import AuthSectionText from "../SignUp/AuthSectionText";
import Footer from "./Footer";
import useRedirectWhenLogged from "../../features/auth/hooks/redirectWhenLogged";
import * as S from "./Styles";

const SignIn = () => {
  useRedirectWhenLogged();

  return (
    <S.SignInContainer>
      <SignInForm />
      <AuthSectionText />
      <Footer />
    </S.SignInContainer>
  );
};

export default SignIn;
