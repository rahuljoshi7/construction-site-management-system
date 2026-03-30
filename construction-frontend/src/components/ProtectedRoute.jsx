import { Navigate } from "react-router-dom";

// Helper functions
const getToken = () => localStorage.getItem("token");

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

function ProtectedRoute({ children, allowedRoles }) {

  const token = getToken();
  const user = getUser();

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Invalid user (edge case)
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;