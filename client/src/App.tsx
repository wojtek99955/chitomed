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
import MedicalIncidentForm from "./iso/forms/MedicalIncident";
import PMCFSurvey from "./iso/forms/PMCFSurvey";
import NovaOssProductionForm from "./iso/forms/NovaOssProductionForm";
import AppLauncher from "./iso/pages/AppLauncher/AppLauncher";
import ISODashboard from "./iso/pages/Dashboard/Dashboard"
import Links from "./iso/pages/Links/Links";
import ISOOrders from "./iso/pages/ISOOrders/ISOOrders";
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
          <Route
            path="/medical-incident-form"
            element={<MedicalIncidentForm />}
          />
          <Route path="/pmcf-survey" element={<PMCFSurvey />} />
          <Route
            path="nova-oss-production-form"
            element={<NovaOssProductionForm />}
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
              <Route path="/iso/dashboard" element={<ISODashboard />} />
              <Route path="/iso/orders" element={<ISOOrders />} />
              <Route path="/iso/links" element={<Links />} />
            </Route>
            <Route
              path="add-material"
              element={
                <AdminRoute>
                  <AddMaterialModal />
                </AdminRoute>
              }
            />
            <Route
              path="apps"
              element={
                <AdminRoute>
                  <AppLauncher />
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
