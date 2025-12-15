import styled from "styled-components";
import SignInForm from "../../features/auth/SignInForm";
import { useEffect } from "react";
import axios from "axios";
// import { useEffect } from "react";
// import axios from "axios";

const Container = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignIn = () => {
  useEffect(() => {
    // Test CORS – wywołujemy endpoint /test-cors z backendu
    const testCors = async () => {
      try {
        const response = await axios.get("http://localhost:5000");
        console.log("✅ CORS działa!", response.data);
        // Przykład odpowiedzi: { message: "CORS działa! Jesteś z http://localhost:5173" }
      } catch (error: any) {
        if (error.response) {
          // Serwer odpowiedział, ale z błędem (np. 404)
          console.error(
            "❌ Serwer odpowiedział, ale błąd:",
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          // Żądanie wysłane, ale brak odpowiedzi (najczęściej CORS!)
          console.error(
            "❌ Błąd CORS lub serwer nie odpowiada:",
            error.message
          );
          console.error(
            "Sprawdź, czy backend działa na http://localhost:5000 i czy ma app.use(cors())"
          );
        } else {
          console.error("❌ Inny błąd:", error.message);
        }
      }
    };

    testCors();
  }, []); // [] = wykonaj raz po załadowaniu komponentu

  return (
    <Container>
      <SignInForm />
    </Container>
  );
};

export default SignIn;
