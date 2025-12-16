import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import GlobalStyle from "./assets/GlobalStyle";
import SignIn from "./pages/SignIn/SignIn";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Dashboard from "./pages/protected/Dashboard/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import MaterialPage from "./pages/protected/features/materials/pages/MaterialPage";
import UsersPage from "./pages/protected/features/users/pages/UsersPage";
import User from "./pages/protected/features/users/pages/User";
import AddVideoTest from "./pages/protected/features/video/components/AddVideoTest";

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
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/material/:id" element={<MaterialPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/videotest" element={<AddVideoTest />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
