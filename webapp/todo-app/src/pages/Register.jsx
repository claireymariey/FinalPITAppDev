import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();

  // State variables
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // <-- Added email
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/register/", {
        username,
        email,
        password,
      });
      

      // Optional: Save token if you want auto-login
      // localStorage.setItem("access", response.data.access);
      // localStorage.setItem("refresh", response.data.refresh);

      // Navigate to login
      alert(response.data.message); // Show success alert
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || "Registration failed. Try a different username or email."
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
