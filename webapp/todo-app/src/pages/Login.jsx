import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://finalpitappdev.onrender.com/api/token/", {
        username,
        password,
      });
      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      navigate("/dashboard"); // redirect after successful login
    } catch (err) {
      setError("Invalid username or password");
    }
  };

    return (
    <div className="login-page">
      <div className="login-container">
        <form className="auth-form" onSubmit={handleLogin}>
          <h2 className="logo">MOTION DETECTED YARN</h2>
          <p className="welcome-text">
            Welcome Bakosh!<br />
            Mag motion detector na ta BAKS! 
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
            type="password"
            placeholder="Input your password…"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="sign-in-btn">
            Sign In
          </button>

          <div className="auth-bottom">
            Don’t Have an Account?{" "}
            <button
              className="link-button"
              onClick={() => navigate("/register")}
            >
              Register Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
