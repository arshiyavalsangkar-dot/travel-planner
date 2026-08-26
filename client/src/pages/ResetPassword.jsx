import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaPlaneDeparture,
  FaArrowLeft,
} from "react-icons/fa";
import bgImage from "../assets/images/mountain.jpg";
import "./Login.css";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!password || !confirmPassword) {
      setError("Please enter both passwords");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const token = sessionStorage.getItem("resetToken");

    if (!token) {
      setError(
        "Reset token not found. Please request a new password reset."
      );
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        setMessage("Password reset successfully!");

        // Remove used token
        sessionStorage.removeItem("resetToken");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      console.error("RESET PASSWORD ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Unable to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `linear-gradient(rgba(20,15,50,.30), rgba(15,10,35,.45)), url(${bgImage})`,
      }}
    >
      <div className="overlay"></div>

      <div className="login-card">
        <div className="logo-box">
          <FaPlaneDeparture className="plane-icon" />
        </div>

        <h1>Reset Password</h1>

        <p className="subtitle">
          Create a new password for your account.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <FaLock className="input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="input-box">
            <FaLock className="input-icon" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>
          </div>

          {message && (
            <p
              style={{
                color: "#22c55e",
                textAlign: "center",
                marginBottom: "15px",
              }}
            >
              {message}
            </p>
          )}

          {error && (
            <p
              style={{
                color: "#ef4444",
                textAlign: "center",
                marginBottom: "15px",
              }}
            >
              {error}
            </p>
          )}

          <button
            className="login-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="signup-text">
          <Link to="/login" className="signup-link">
            <FaArrowLeft /> Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;