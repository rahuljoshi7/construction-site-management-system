import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // 🔐 Get user safely
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const role = user?.role;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // 🔥 ROLE-BASED NAV ITEMS
  const navItems = [
    {
      path: "/",
      label: "Dashboard",
      roles: ["admin", "supervisor"],
    },
    {
      path: "/labour",
      label: "Labour",
      roles: ["admin"], // 👈 Only admin
    },
    {
      path: "/attendance",
      label: "Attendance",
      roles: ["admin", "supervisor"],
    },
    {
      path: "/payroll",
      label: "Payroll",
      roles: ["admin", "supervisor"],
    },
    {
    path: "/material",
    label: "Materials",
    roles: ["admin", "supervisor"]
    },
    {
    path: "/expense",
    label: "Expenses",
    roles: ["admin", "supervisor"]
    },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* BRAND */}
        <div className="navbar-brand">
          <span className="brand-title">SiteManager Pro</span>
        </div>

        {/* NAV LINKS */}
        {token && (
          <div className="navbar-links">

            {navItems
              .filter((item) => item.roles.includes(role)) // 🔥 Role filtering
              .map((item) => {

                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-link ${isActive ? "active" : ""}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
          </div>
        )}

        {/* RIGHT SIDE */}
        <div className="navbar-actions">
          {!token ? (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login">
                Login
              </Link>
              <Link to="/signup" className="btn-signup">
                Sign Up
              </Link>
            </div>
          ) : (
            <button className="btn-logout" onClick={logout}>
              Logout
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;