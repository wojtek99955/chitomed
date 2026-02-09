import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/GlobalStyle";
import SignIn from "./pages/SignIn/SignIn";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Dashboard from "./pages/protected/Dashboard/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import MaterialPage from "./pages/protected/features/materials/pages/MaterialPage";
import UsersPage from "./pages/protected/features/users/pages/UsersPage";
import User from "./pages/protected/features/users/pages/User";
import SignUp from "./pages/SignUp/SignUp";
import ProfilePage from "./pages/protected/features/profile/pages/ProfilePage";

import MaterialsPage from "./pages/protected/features/materials/pages/MaterialsPage";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Router>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/" element={<SignIn />} />

            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<MaterialsPage />} />
              </Route>
              <Route path="material/:id" element={<MaterialPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="users/:id" element={<User />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
