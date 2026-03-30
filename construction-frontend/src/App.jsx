import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import LabourPage from "./pages/LabourPage";
import AttendancePage from "./pages/AttendancePage";
import PayrollPage from "./pages/PayrollPage";
import MaterialPage from "./pages/MaterialPage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ExpensePage from "./pages/ExpensePage";
function Layout() {
  const location = useLocation();

  // Hide navbar on login/signup
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* ================= AUTH ROUTES ================= */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* ================= PROTECTED ROUTES ================= */}

        {/* Dashboard (All logged-in users) */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["admin", "supervisor"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Labour (Admin only) */}
        <Route
          path="/labour"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <LabourPage />
            </ProtectedRoute>
          }
        />

        {/* Attendance (Admin + Supervisor) */}
        <Route
          path="/attendance"
          element={
            <ProtectedRoute allowedRoles={["admin", "supervisor"]}>
              <AttendancePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/material"
          element={
            <ProtectedRoute allowedRoles={["admin", "supervisor"]}>
              <MaterialPage />
            </ProtectedRoute>
          }
        />
        {/* Payroll (Admin + Supervisor) */}
        <Route
          path="/payroll"
          element={
            <ProtectedRoute allowedRoles={["admin", "supervisor"]}>
              <PayrollPage />
            </ProtectedRoute>
          }
        />


        <Route
          path="/expense"
          element={
            <ProtectedRoute allowedRoles={["admin", "supervisor"]}>
              <ExpensePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;