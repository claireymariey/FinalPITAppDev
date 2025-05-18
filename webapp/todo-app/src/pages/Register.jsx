import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate matching passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Debug: log what's being sent
    console.log("Sending:", { username, email, password });

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register/",
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Optional: Store JWT tokens
      // localStorage.setItem("access", response.data.access);
      // localStorage.setItem("refresh", response.data.refresh);

      alert(response.data.message); // Success message
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.error ||
          "Registration failed. Try a different username or email."
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form className="auth-form" onSubmit={handleRegister}>
          <h2 className="logo">MOTION DETECTED YARN</h2>
          <p className="welcome-text">
            Create your account and start your journey!
          </p>

          {error && <p className="error">{error}</p>}

          <input
            type="text"
            placeholder="Input your username…"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Input your email…"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Create a password…"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm your password…"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="sign-in-btn">
            Register
          </button>

          <div className="auth-bottom">
            Already have an account?{" "}
            <button
              className="link-button"
              onClick={() => navigate("/login")}
              type="button"
            >
              Login Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
