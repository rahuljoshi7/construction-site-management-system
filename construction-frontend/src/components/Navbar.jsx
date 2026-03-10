import { Link, useLocation, useNavigate } from "react-router-dom";
import './Navbar.css';

function Navbar() {

  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  const navItems = [

    {
      path: '/',
      label: 'Dashboard'
    },

    {
      path: '/labour',
      label: 'Labour'
    },

    {
      path: '/attendance',
      label: 'Attendance'
    },

    {
      path: '/payroll',
      label: 'Payroll'
    }

  ];

  return (

    <nav className="navbar">

      <div className="navbar-container">

        {/* BRAND */}
        <div className="navbar-brand">

          <span className="brand-title">
            SiteManager Pro
          </span>

        </div>

        {/* NAV LINKS ONLY IF LOGGED IN */}

        {token && (

          <div className="navbar-links">

            {navItems.map((item) => {

              const isActive = location.pathname === item.path;

              return (

                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${isActive ? 'active' : ''}`}
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

            <button
              className="btn-logout"
              onClick={logout}
            >
              Logout
            </button>

          )}

        </div>

      </div>

    </nav>

  );

}

export default Navbar;