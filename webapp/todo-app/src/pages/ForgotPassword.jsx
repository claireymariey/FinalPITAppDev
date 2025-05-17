import { useNavigate } from 'react-router-dom';
import './Auth.css';

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    // Add password reset logic here
    alert('Password reset link sent!');
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleReset}>
        <h2>Reset Password</h2>
        <input type="email" placeholder="Enter your email" required />
        <button type="submit">Send Reset Link</button>
        <div className="auth-links">
          <button type="button" className="link-button" onClick={() => navigate('/login')}>
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
}
