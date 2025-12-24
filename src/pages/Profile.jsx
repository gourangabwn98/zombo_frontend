// pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, User, LogOut } from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();

  // Load user from localStorage
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("zombo_user"));
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(storedUser);

    // Optional: Load saved address if you store it separately
    const savedAddress = localStorage.getItem("delivery_address") || "";
    setAddress(savedAddress);
  }, [navigate]);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSaveAddress = () => {
    localStorage.setItem("delivery_address", address);
    alert("Delivery address saved!");
  };

  const handleLogout = () => {
    localStorage.removeItem("zombo_token");
    localStorage.removeItem("zombo_user");
    localStorage.removeItem("delivery_address");
    navigate("/login");
  };

  if (!user) return null; // Loading or redirecting

  const userInitial = user.name.charAt(0).toUpperCase();

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {/* Header with Avatar */}
        <div style={styles.header}>
          <div style={styles.avatar}>{userInitial}</div>
          <h1 style={styles.name}>{user.name}</h1>
          <p style={styles.email}>{user.email}</p>
        </div>

        {/* User Details */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Account Details</h2>
          <div style={styles.detailRow}>
            <User size={20} color="#ffe066" />
            <span>{user.name}</span>
          </div>
          <div style={styles.detailRow}>
            <Mail size={20} color="#ffe066" />
            <span>{user.email}</span>
          </div>
          <div style={styles.detailRow}>
            <Phone size={20} color="#ffe066" />
            <span>{user.phone}</span>
          </div>
          {user.gender && (
            <div style={styles.detailRow}>
              <span style={{ marginRight: "10px" }}>⚥</span>
              <span>{user.gender}</span>
            </div>
          )}
        </div>

        {/* Delivery Address */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Delivery Address</h2>
          <textarea
            value={address}
            onChange={handleAddressChange}
            placeholder="Enter your full delivery address (e.g., Flat no., Building, Street, Landmark)"
            style={styles.addressInput}
            rows="5"
          />
          <button onClick={handleSaveAddress} style={styles.saveBtn}>
            Save Address
          </button>
        </div>

        {/* Logout */}
        <button onClick={handleLogout} style={styles.logoutBtn}>
          <LogOut size={20} style={{ marginRight: "8px" }} />
          Logout
        </button>
      </div>
    </div>
  );
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
    maxWidth: "520px",
    background: "rgba(255,255,255,0.16)",
    backdropFilter: "blur(20px)",
    borderRadius: "32px",
    padding: "50px 40px",
    boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
    border: "1px solid rgba(255,255,255,0.25)",
    color: "white",
    textAlign: "center",
  },
  header: {
    marginBottom: "40px",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #ffe066, #ff6b6b)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "56px",
    fontWeight: "bold",
    margin: "0 auto 20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  },
  name: {
    fontSize: "32px",
    fontWeight: "900",
    margin: "10px 0",
  },
  email: {
    fontSize: "18px",
    opacity: 0.9,
  },
  section: {
    marginBottom: "40px",
    textAlign: "left",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#ffe066",
    textAlign: "center",
  },
  detailRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    fontSize: "17px",
    marginBottom: "16px",
    padding: "12px 0",
  },
  addressInput: {
    width: "100%",
    padding: "16px",
    borderRadius: "18px",
    border: "none",
    background: "rgba(255,255,255,0.2)",
    color: "white",
    fontSize: "16px",
    resize: "none",
    marginBottom: "16px",
  },
  saveBtn: {
    width: "100%",
    padding: "16px",
    background: "#ffe066",
    color: "#333",
    border: "none",
    borderRadius: "18px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  logoutBtn: {
    width: "100%",
    padding: "16px",
    background: "#ff4757",
    color: "white",
    border: "none",
    borderRadius: "18px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default ProfilePage;
