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
// import InProgressPage from "./pages/InProgressPage/InProgressPage";
import ResetPasswordForm from "./features/auth/ResetPasswordForm/ResetPasswordForm";
import AdminRoute from "./features/auth/AdminRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import AddMaterialModal from "./pages/protected/features/materials/components/AddMaterial/AddMaterial";
import ForgotPassword from "./features/auth/SignIn/ForgotPasswordForm";
import SignIn from "./features/auth/SignIn/SignIn";
import AppLauncher from "./iso/pages/AppLauncher/AppLauncher";
import ISODashboard from "./iso/pages/Dashboard/Dashboard"
import Links from "./iso/pages/Links/Links";
import ISOOrders from "./iso/pages/ISOOrders/ISOOrders";
import CyberboneForm from "./iso/features/forms/components/forms/CyberboneOrder";
import MedicalIncidentForm from "./iso/features/forms/components/forms/MedicalIncident";
import OrderPage from "./iso/features/orders/pages/OrderPage";
import DocumentView from "./iso/features/orderDocuments/pages/DocumentView/DocumentView";
import NovaOssProductionForm from "./iso/features/forms/components/forms/NovaOssProductionForm";
import PMCFSurvey from "./iso/features/forms/components/forms/PMCFSurvey";
import PdfUploadPage from "./iso/features/orderDocuments/pages/PDFUploadPage/PDFUploadPage";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<SignIn />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordForm />}
          />
          <Route path="/cyberbone-order-form" element={<CyberboneForm />} />
          <Route path="/medical-event/:id" element={<MedicalIncidentForm />} />
          <Route path="/pmcf/:id" element={<PMCFSurvey />} />
          <Route
            path="nova-oss-order-form"
            element={<NovaOssProductionForm />}
          />
          <Route path="/iso/orders/:id/upload" element={<PdfUploadPage />} />

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
              <Route path="/iso/orders/:id" element={<OrderPage />} />
              <Route path="/iso/profile" element={<ProfilePage />} />

              <Route
                path="/iso/orders/:id/doc/:docId"
                element={<DocumentView />}
              />
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
