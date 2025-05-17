import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/register/", {
        username,
        password,
      });
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Try a different username.");
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
            placeholder="Input your email…"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

          <button type="submit" className="sign-in-btn">Register</button>

          <div className="auth-bottom">
            Already have an account?{" "}
            <button
              className="link-button"
              onClick={() => navigate("/login")}
            >
              Login Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
