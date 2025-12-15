import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import GlobalStyle from "./assets/GlobalStyle";
import SignIn from "./pages/SignIn/SignIn";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Dashboard from "./pages/protected/Dashboard/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
