// App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyle from "./assets/GlobalStyle";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/protected/Dashboard/Dashboard";
import UsersPage from "./pages/protected/features/users/pages/UsersPage";
import User from "./pages/protected/features/users/pages/User";
import MaterialPage from "./pages/protected/features/materials/pages/MaterialPage";
import ProfilePage from "./pages/protected/features/profile/pages/ProfilePage";
import AddMaterialModal from "./pages/protected/features/materials/components/AddMaterial";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InProgressPage from "./pages/InProgressPage/InProgressPage";
import ForgotPassword from "./pages/SignIn/ForgotPasswordForm";
import ResetPasswordForm from "./pages/protected/ResetPasswordForm/ResetPasswordForm";
import AdminRoute from "./features/auth/AdminRoute";
import { useEffect } from "react";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    let language = localStorage.getItem("language");

    if (!language) {
      localStorage.setItem("language", "en");
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<InProgressPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordForm />}
          />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route
                path="users"
                element={
                  <AdminRoute>
                    <UsersPage />
                  </AdminRoute>
                }
              />
              <Route path="users/:id" element={<User />} />
              <Route path="material/:id" element={<MaterialPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route
              path="add-material"
              element={
                <AdminRoute>
                  <AddMaterialModal />
                </AdminRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
