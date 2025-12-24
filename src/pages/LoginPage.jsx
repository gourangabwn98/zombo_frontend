// pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2, LogIn } from "lucide-react";
import { useAuth } from "../components/context/AuthContext";
import axios from "axios"; // ← Add this import

const API_BASE_URL = "https://zombo.onrender.com"; // Change to your production URL later

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // For showing server-side errors

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when user types
  };

  const handleSubmit = async () => {
    // Basic client-side validation
    if (!form.email || !form.password) {
      setError("Please enter email and password");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: form.email,
        password: form.password,
      });

      const { token, user } = response.data;

      // Save token and user data
      localStorage.setItem("zombo_token", token);
      localStorage.setItem("zombo_user", JSON.stringify(user));

      // Update auth context
      login(user);

      // Navigate to cart or home
      navigate("/view-cart");
    } catch (err) {
      setLoading(false);

      if (err.response) {
        // Server error (e.g., 401 Invalid credentials)
        setError(err.response.data.message || "Invalid email or password");
      } else {
        setError("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.iconCircle}>
            <LogIn color="white" size={40} />
          </div>
          <h1 style={styles.title}>ZOMBO</h1>
          <p style={styles.subtitle}>Welcome Back! Login to continue</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          {/* Email Field */}
          <div style={{ position: "relative" }}>
            <Mail
              size={22}
              style={{
                position: "absolute",
                left: "18px",
                top: "19px",
                color: "#ddd",
              }}
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              style={inputStyle}
            />
          </div>

          {/* Password Field */}
          <div style={{ position: "relative" }}>
            <Lock
              size={22}
              style={{
                position: "absolute",
                left: "18px",
                top: "19px",
                color: "#ddd",
              }}
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              style={inputStyle}
            />
          </div>

          {/* Show error message */}
          {error && (
            <span
              style={{
                color: "#ff6b6b",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {error}
            </span>
          )}

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              ...styles.button,
              background: loading ? "rgba(255,255,255,0.4)" : "white",
              color: "#667eea",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading && <Loader2 size={24} className="animate-spin" />}
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        {/* Divider */}
        <div style={styles.divider}>
          <span>OR</span>
        </div>

        {/* Register Link */}
        <p style={styles.footerText}>
          Don't have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/register")}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "85%",
  padding: "18px 18px 18px 56px",
  fontSize: "17px",
  borderRadius: "18px",
  border: "none",
  outline: "none",
  background: "rgba(255,255,255,0.25)",
  color: "white",
  backdropFilter: "blur(10px)",
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "460px",
    background: "rgba(255,255,255,0.16)",
    borderRadius: "32px",
    padding: "50px 35px",
    backdropFilter: "blur(20px)",
    boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
    border: "1px solid rgba(255,255,255,0.25)",
    color: "white",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #ff6b6b, #feca57)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px",
  },
  title: {
    fontSize: "42px",
    fontWeight: "900",
    background: "linear-gradient(135deg, #ffe066, #ff6b6b)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "1px",
  },
  subtitle: {
    fontSize: "18px",
    opacity: 0.9,
    marginTop: "10px",
  },
  button: {
    width: "100%",
    padding: "20px",
    borderRadius: "20px",
    border: "none",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
  },
  divider: {
    margin: "35px 0",
    textAlign: "center",
    position: "relative",
    color: "rgba(255,255,255,0.7)",
    fontSize: "15px",
  },
  footerText: {
    textAlign: "center",
    marginTop: "30px",
    fontSize: "16px",
    opacity: 0.9,
  },
  link: {
    textDecoration: "underline",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#ffe066",
  },
};

export default LoginPage;
