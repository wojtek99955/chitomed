import AuthSectionText from "../SignUp/AuthSectionText";
import SignInForm from "../components/SignInForm/SignInForm";
import useRedirectWhenLogged from "../hooks/redirectWhenLogged";
import Footer from "./Footer";
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
