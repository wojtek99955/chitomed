import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyle from "./assets/GlobalStyle";
import SignUp from "./features/auth/SignUp/SignUp";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/protected/Dashboard/Dashboard";
import UsersPage from "./pages/protected/features/users/pages/UsersPage";
import User from "./pages/protected/features/users/pages/User";
import MaterialPage from "./pages/protected/features/materials/pages/MaterialPage/MaterialPage";
import ProfilePage from "./pages/protected/features/profile/pages/ProfilePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InProgressPage from "./pages/InProgressPage/InProgressPage";
import ResetPasswordForm from "./features/auth/ResetPasswordForm/ResetPasswordForm";
import AdminRoute from "./features/auth/AdminRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import AddMaterialModal from "./pages/protected/features/materials/components/AddMaterial/AddMaterial";
import ForgotPassword from "./features/auth/SignIn/ForgotPasswordForm";
import SignIn from "./features/auth/SignIn/SignIn";
import CyberboneForm from "./iso/forms/CyberboneOrder";

const queryClient = new QueryClient();

function App() {
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
          <Route path="/cyberbone-order-form" element={<CyberboneForm />} />

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
