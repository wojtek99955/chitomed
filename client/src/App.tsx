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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<InProgressPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            {/* MainLayout zawiera Sidebar, niezależny od Routes */}
            <Route element={<MainLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="users/:id" element={<User />} />
              <Route path="material/:id" element={<MaterialPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="add-material" element={<AddMaterialModal />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
