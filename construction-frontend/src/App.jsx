import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import LabourPage from "./pages/LabourPage";
import AttendancePage from "./pages/AttendancePage";
import PayrollPage from "./pages/PayrollPage";
import MaterialPage from "./pages/MaterialPage";
import ExpensePage from "./pages/ExpensePage";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* AUTH */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* DASHBOARD */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["admin", "supervisor"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* LABOUR */}
        <Route
          path="/labour"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <LabourPage />
            </ProtectedRoute>
          }
        />

        {/* ATTENDANCE */}
        <Route
          path="/attendance"
          element={
            <ProtectedRoute allowedRoles={["admin", "supervisor"]}>
              <AttendancePage />
            </ProtectedRoute>
          }
        />

        {/* MATERIAL */}
        <Route
          path="/material"
          element={
            <ProtectedRoute allowedRoles={["admin", "supervisor"]}>
              <MaterialPage />
            </ProtectedRoute>
          }
        />

        {/* PAYROLL */}
        <Route
          path="/payroll"
          element={
            <ProtectedRoute allowedRoles={["admin", "supervisor"]}>
              <PayrollPage />
            </ProtectedRoute>
          }
        />

        {/* EXPENSE */}
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