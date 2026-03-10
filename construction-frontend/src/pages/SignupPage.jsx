import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function SignupPage() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("supervisor");

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    // Validate name
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    // Validate email
    if (!gmailRegex.test(email)) {
      alert("Please enter a valid Gmail address (example@gmail.com)");
      return;
    }

    // Validate password
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {

      await API.post("/auth/signup", {
        name,
        email,
        password,
        role
      });

      alert("Signup successful! Please login.");

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Signup failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2>Create Account</h2>

        <input
          type="text"
          className="auth-input"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          className="auth-input"
          placeholder="Enter Gmail (example@gmail.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="auth-input"
          placeholder="Enter Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="auth-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="supervisor">Supervisor</option>
        </select>

        <button
          className="auth-button"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="auth-link">

          Already have an account?{" "}
          
          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default SignupPage;