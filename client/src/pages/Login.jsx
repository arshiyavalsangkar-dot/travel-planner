import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaPlaneDeparture,
} from "react-icons/fa";
import bgImage from "../assets/images/mountain.jpg";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Normal Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password) {
      alert("Please enter email and password");
      return;
    }

    try {
      console.log("Login request:", {
        email: form.email,
      });

      const res = await axios.post(
        "https://travel-planner-cf3c.onrender.com/api/auth/login",
        {
          email: form.email.trim(),
          password: form.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login response:", res.data);

      if (res.data.success) {
        // Save JWT token
        localStorage.setItem("token", res.data.token);

        // Save user through AuthContext
        login(res.data.user);

        // Go to Dashboard
        navigate("/dashboard");
      } else {
        alert(res.data.message || "Login Failed");
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      console.error("STATUS:", error.response?.status);
      console.error("DATA:", error.response?.data);
      console.error("MESSAGE:", error.message);

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Login Failed";

      alert(message);
    }
  };

  // Google Login
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      if (!credentialResponse?.credential) {
        alert("Google authentication failed");
        return;
      }

      console.log("Google credential received");

      const res = await axios.post(
        "https://travel-planner-cf3c.onrender.com/api/auth/google",
        {
          credential: credentialResponse.credential,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Google Login response:", res.data);

      if (res.data.success) {
        // Save JWT token
        localStorage.setItem("token", res.data.token);

        // Save Google user through AuthContext
        login(res.data.user);

        // Go to Dashboard
        navigate("/dashboard");
      } else {
        alert(res.data.message || "Google Login Failed");
      }
    } catch (error) {
      console.error("GOOGLE LOGIN ERROR:", error);
      console.error("STATUS:", error.response?.status);
      console.error("DATA:", error.response?.data);
      console.error("MESSAGE:", error.message);

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Google Login Failed";

      alert(message);
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

        <h1>Travel Planner</h1>

        <p className="subtitle">
          Plan unforgettable journeys around the world.
        </p>

        <form onSubmit={handleLogin}>
          <div className="input-box">
            <FaEnvelope className="input-icon" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <FaLock className="input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="forgot-row">
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.log("Google Login Failed");
              alert("Google Login Failed");
            }}
            useOneTap={false}
          />
        </form>

        <p className="signup-text">
          Don't have an account?{" "}
          <Link to="/register" className="signup-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;