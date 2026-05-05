import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import LabourPage from "./pages/LabourPage";
import AttendancePage from "./pages/AttendancePage";
import PayrollPage from "./pages/PayrollPage";
import MaterialPage from "./pages/MaterialPage";
<<<<<<< HEAD
import ExpensePage from "./pages/ExpensePage";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function Layout() {
  const location = useLocation();

=======
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ExpensePage from "./pages/ExpensePage";
function Layout() {
  const location = useLocation();

  // Hide navbar on login/signup
>>>>>>> 78e9583c7956c4b4b9af980d8c6e7133c70fcc21
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

<<<<<<< HEAD
        {/* AUTH */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* DASHBOARD */}
=======
        {/* ================= AUTH ROUTES ================= */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* ================= PROTECTED ROUTES ================= */}

        {/* Dashboard (All logged-in users) */}
>>>>>>> 78e9583c7956c4b4b9af980d8c6e7133c70fcc21
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["admin", "supervisor"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

<<<<<<< HEAD
        {/* LABOUR */}
=======
        {/* Labour (Admin only) */}
>>>>>>> 78e9583c7956c4b4b9af980d8c6e7133c70fcc21
        <Route
          path="/labour"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <LabourPage />
            </ProtectedRoute>
          }
        />

<<<<<<< HEAD
        {/* ATTENDANCE */}
=======
        {/* Attendance (Admin + Supervisor) */}
>>>>>>> 78e9583c7956c4b4b9af980d8c6e7133c70fcc21
        <Route
          path="/attendance"
          element={
            <ProtectedRoute allowedRoles={["admin", "supervisor"]}>
              <AttendancePage />
            </ProtectedRoute>
          }
        />
<<<<<<< HEAD

        {/* MATERIAL */}
=======
>>>>>>> 78e9583c7956c4b4b9af980d8c6e7133c70fcc21
        <Route
          path="/material"
          element={
            <ProtectedRoute allowedRoles={["admin", "supervisor"]}>
              <MaterialPage />
            </ProtectedRoute>
          }
        />
<<<<<<< HEAD

        {/* PAYROLL */}
=======
        {/* Payroll (Admin + Supervisor) */}
>>>>>>> 78e9583c7956c4b4b9af980d8c6e7133c70fcc21
        <Route
          path="/payroll"
          element={
            <ProtectedRoute allowedRoles={["admin", "supervisor"]}>
              <PayrollPage />
            </ProtectedRoute>
          }
        />

<<<<<<< HEAD
        {/* EXPENSE */}
=======

>>>>>>> 78e9583c7956c4b4b9af980d8c6e7133c70fcc21
        <Route
          path="/expense"
          element={
            <ProtectedRoute allowedRoles={["admin", "supervisor"]}>
              <ExpensePage />
            </ProtectedRoute>
          }
        />
<<<<<<< HEAD

=======
>>>>>>> 78e9583c7956c4b4b9af980d8c6e7133c70fcc21
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