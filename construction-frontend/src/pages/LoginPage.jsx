import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    // Email validation
    if (!gmailRegex.test(email)) {
      alert("Please enter a valid Gmail address (example@gmail.com)");
      return;
    }

    // Password validation
    if (!password) {
      alert("Please enter password");
      return;
    }

    setLoading(true);

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save user
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

      // Redirect to dashboard
      navigate("/");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Login failed. Please check credentials."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2>Login</h2>

        <input
          type="email"
          className="auth-input"
          placeholder="Enter Gmail (example@gmail.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="auth-input"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="auth-button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="auth-link">

          Don't have an account?{" "}
          
          <Link to="/signup">
            Sign up
          </Link>

        </p>

      </div>

    </div>

  );

}

export default LoginPage;