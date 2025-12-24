// pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Phone, User, Loader2 } from "lucide-react";
import { useAuth } from "../components/context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import axios from "axios"; // ← Add this import

const API_BASE_URL = "https://zombo.onrender.com"; // Change to your backend URL in production (e.g., https://yourdomain.com)

const RegisterPage = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, "")))
      newErrors.phone = "Please enter a valid 10-digit phone number";

    if (!form.gender) newErrors.gender = "Please select gender";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Please enter a valid email";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({}); // Clear previous server errors

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        name: form.name,
        phone: form.phone,
        gender: form.gender,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      const { token, user } = response.data;

      // Save token and user data (you can use localStorage or context)
      localStorage.setItem("zombo_token", token);
      localStorage.setItem("zombo_user", JSON.stringify(user));

      // Update auth context
      login(user);

      // Navigate to cart or home
      navigate("/view-cart");
    } catch (error) {
      setLoading(false);

      if (error.response) {
        // Server responded with error (400, 500, etc.)
        const serverError = error.response.data.message;
        if (serverError.includes("already exists")) {
          setErrors({ email: "Email or phone already registered" });
        } else {
          alert(serverError || "Registration failed. Please try again.");
        }
      } else {
        alert("Network error. Please check your internet connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`Login with ${provider} (coming soon!)`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.16)",
          backdropFilter: "blur(20px)",
          borderRadius: "32px",
          padding: "40px 45px",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.25)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: "900",
              background: "linear-gradient(135deg, #ffe066, #ff6b6b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "1px",
            }}
          >
            ZOMBO
          </h1>
          <p style={{ fontSize: "20px", marginTop: "12px", opacity: 0.9 }}>
            Create Your Account
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* Name Field */}
          <div style={{ position: "relative" }}>
            <User size={22} style={iconStyle} />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              style={inputStyle}
            />
            {errors.name && <span style={errorStyle}>{errors.name}</span>}
          </div>

          {/* Phone Field */}
          <div style={{ position: "relative" }}>
            <Phone size={22} style={iconStyle} />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              style={inputStyle}
            />
            {errors.phone && <span style={errorStyle}>{errors.phone}</span>}
          </div>

          {/* Gender Field */}
          <div style={{ position: "relative" }}>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              style={{ ...inputStyle, paddingLeft: "18px", width: "100%" }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <span style={errorStyle}>{errors.gender}</span>}
          </div>

          {/* Email Field */}
          <div style={{ position: "relative" }}>
            <Mail size={22} style={iconStyle} />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              style={inputStyle}
            />
            {errors.email && <span style={errorStyle}>{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div style={{ position: "relative" }}>
            <Lock size={22} style={iconStyle} />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password (min 6 characters)"
              style={inputStyle}
            />
            {errors.password && (
              <span style={errorStyle}>{errors.password}</span>
            )}
          </div>

          {/* Confirm Password Field */}
          <div style={{ position: "relative" }}>
            <Lock size={22} style={iconStyle} />
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              style={inputStyle}
            />
            {errors.confirmPassword && (
              <span style={errorStyle}>{errors.confirmPassword}</span>
            )}
          </div>

          {/* Register Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              marginTop: "15px",
              padding: "18px",
              background: loading ? "rgba(255,255,255,0.4)" : "white",
              color: "#667eea",
              border: "none",
              borderRadius: "20px",
              fontSize: "19px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {loading && <Loader2 size={24} className="animate-spin" />}
            {loading ? "Creating Account..." : "Register"}
          </button>
        </div>

        {/* Divider */}
        <div style={dividerStyle}>
          <span style={dividerTextStyle}>OR</span>
        </div>

        {/* Social Login Buttons */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <button
            onClick={() => handleSocialLogin("Google")}
            style={socialButtonStyle("white", "#333")}
          >
            <FcGoogle size={28} />
            <span style={{ fontWeight: "600" }}>Google</span>
          </button>

          <button
            onClick={() => handleSocialLogin("Facebook")}
            style={socialButtonStyle("#1877F2", "white")}
          >
            <FaFacebookF size={28} />
            <span style={{ fontWeight: "600" }}>Facebook</span>
          </button>
        </div>

        {/* Login Link */}
        <p
          style={{
            textAlign: "center",
            marginTop: "30px",
            fontSize: "16px",
            opacity: 0.9,
          }}
        >
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

// Reusable styles (unchanged)
const iconStyle = {
  position: "absolute",
  left: "18px",
  top: "19px",
  color: "#ddd",
  zIndex: 1,
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

const errorStyle = {
  color: "#ff6b6b",
  fontSize: "14px",
  marginTop: "6px",
  display: "block",
};

const dividerStyle = {
  margin: "35px 0",
  textAlign: "center",
  position: "relative",
  color: "rgba(255,255,255,0.7)",
  fontSize: "15px",
};

const dividerTextStyle = {
  background: "rgba(255,255,255,0.16)",
  padding: "0 20px",
};

const socialButtonStyle = (bgColor, textColor) => ({
  flex: 1,
  padding: "16px",
  background: bgColor,
  border: "none",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  color: textColor,
});

export default RegisterPage;
