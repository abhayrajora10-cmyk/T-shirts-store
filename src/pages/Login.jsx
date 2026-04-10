import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { authService } from "../services/authService";
import "../styles/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await authService.login(email, password);
      if (response.success) {
        setSuccess("✅ Login successful! Redirecting...");
        const redirectTo = location.state?.from || "/";
        setTimeout(() => navigate(redirectTo, { replace: true }), 1500);
      } else {
        setError(response.message || "Login failed!");
      }
    } catch (err) {
      setError(err.message || "Login failed! Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back!</h1>
            <p>Login to your account</p>
          </div>

          <form onSubmit={handleLogin} className="auth-form">
            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email">📧 Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`form-input ${error ? "error" : ""}`}
              />
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password">🔐 Password</label>
              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`form-input ${error ? "error" : ""}`}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && <div className="alert alert-error">{error}</div>}

            {/* Success Message */}
            {success && <div className="alert alert-success">{success}</div>}

            {/* Login Button */}
            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >
              {loading ? "🔄 Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">OR</div>

          {/* Sign Up Link */}
          <p className="auth-footer">
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">
              Sign Up Here
            </Link>
          </p>

          {/* Test Credentials */}
          <div className="test-credentials">
            <p className="test-title">🧪 Test Account:</p>
            <p className="test-text">Email: <code>user@example.com</code></p>
            <p className="test-text">Password: <code>password123</code></p>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;