import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { authService } from "../services/authService";
import "../styles/auth.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields");
      return false;
    }

    if (form.username.length < 3) {
      setError("Username should be at least 3 characters");
      return false;
    }

    if (!form.email.includes("@")) {
      setError("Please enter a valid email");
      return false;
    }

    if (form.password.length < 6) {
      setError("Password should be at least 6 characters");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await authService.signup(
        form.username,
        form.email,
        form.password
      );

      if (response.success) {
        setSuccess("✅ Account created successfully! Redirecting...");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setError(response.message || "Signup failed!");
      }
    } catch (err) {
      setError(err.message || "Signup failed! Please try again.");
      console.error("Signup error:", err);
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
            <h1>Create Account</h1>
            <p>Join our T-shirt community</p>
          </div>

          <form onSubmit={handleSignup} className="auth-form">
            {/* Username Input */}
            <div className="form-group">
              <label htmlFor="username">👤 Username</label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Choose a username"
                value={form.username}
                onChange={handleInputChange}
                className={`form-input ${error ? "error" : ""}`}
              />
            </div>

            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email">📧 Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={handleInputChange}
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
                  name="password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleInputChange}
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

            {/* Confirm Password Input */}
            <div className="form-group">
              <label htmlFor="confirmPassword">🔐 Confirm Password</label>
              <div className="password-wrapper">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleInputChange}
                  className={`form-input ${error ? "error" : ""}`}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && <div className="alert alert-error">{error}</div>}

            {/* Success Message */}
            {success && <div className="alert alert-success">{success}</div>}

            {/* Sign Up Button */}
            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >
              {loading ? "🔄 Creating Account..." : "Sign Up"}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">OR</div>

          {/* Login Link */}
          <p className="auth-footer">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Login Here
            </Link>
          </p>

          {/* Features */}
          <div className="auth-features">
            <p className="feature">✅ Browse 36 T-shirt designs</p>
            <p className="feature">✅ Save items to cart</p>
            <p className="feature">✅ Easy checkout process</p>
          </div>
        </div>
      </main>
    </>
  );
}

export default Signup;