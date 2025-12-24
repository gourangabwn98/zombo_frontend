// components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";

const Navbar = ({ cartCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu only

  // Get user from localStorage
  const userData = JSON.parse(localStorage.getItem("zombo_user"));
  const isLoggedIn = !!userData;
  const userInitial = userData?.name
    ? userData.name.charAt(0).toUpperCase()
    : "?";

  return (
    <>
      {/* Main Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "70px",
          background: "linear-gradient(135deg, #8c5fc3ff 0%, #500f89ff 100%)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 4%",
          zIndex: 1000,
          boxShadow: "0 8px 32px rgba(80, 15, 137, 0.3)",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <img
            src="/assets/images/zombo-logo.png"
            alt="ZOMBO Logo"
            style={{
              height: "60px",
              width: "auto",
              objectFit: "contain",
            }}
          />
          <span
            style={{
              fontSize: "32px",
              fontWeight: "900",
              letterSpacing: "1px",
              background:
                "linear-gradient(135deg, #e07e38ff, #f1954bff, #e0c74dff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ZOMBO
          </span>
        </Link>

        {/* Desktop Menu */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
          }}
          className="desktop-menu"
        >
          <Link to="/" style={navLinkStyle}>
            Home
          </Link>
          <Link to="/menu" style={navLinkStyle}>
            Menu
          </Link>
          <Link to="/ordershistory" style={navLinkStyle}>
            Orders
          </Link>

          {/* Cart + User Avatar */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* Cart */}
            <Link
              to="/view-cart"
              style={{ position: "relative", textDecoration: "none" }}
            >
              <ShoppingCart size={28} color="white" strokeWidth={2.5} />
              {cartCount > 0 && <span style={cartBadgeStyle}>{cartCount}</span>}
            </Link>

            {/* User Avatar - Click to go to Profile Page */}
            {isLoggedIn && (
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <div
                  style={avatarStyle}
                  title={`Hi, ${userData.name}! Click to view profile`}
                >
                  {userInitial}
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={mobileToggleStyle}
          className="mobile-toggle"
        >
          {isOpen ? (
            <X size={32} color="white" />
          ) : (
            <Menu size={32} color="white" />
          )}
        </button>
      </nav>

      {/* Mobile Slide-in Menu */}
      {isOpen && (
        <>
          <div style={mobileBackdrop} onClick={() => setIsOpen(false)} />

          <div style={mobileMenuStyle}>
            {/* User Info in Mobile */}
            {isLoggedIn && (
              <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <Link to="/profile" onClick={() => setIsOpen(false)}>
                  <div style={mobileAvatarStyle}>{userInitial}</div>
                </Link>
                <p
                  style={{
                    color: "white",
                    fontSize: "22px",
                    fontWeight: "600",
                    marginTop: "12px",
                  }}
                >
                  {userData.name}
                </p>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: "#ffe066",
                    fontSize: "16px",
                    textDecoration: "underline",
                  }}
                >
                  View Profile
                </Link>
              </div>
            )}

            <div
              style={{ display: "flex", flexDirection: "column", gap: "30px" }}
            >
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                style={mobileLinkStyle}
              >
                Home
              </Link>
              <Link
                to="/menu"
                onClick={() => setIsOpen(false)}
                style={mobileLinkStyle}
              >
                Menu
              </Link>
              <Link
                to="/ordershistory"
                onClick={() => setIsOpen(false)}
                style={mobileLinkStyle}
              >
                Orders
              </Link>

              <Link
                to="/view-cart"
                onClick={() => setIsOpen(false)}
                style={mobileCartStyle}
              >
                <ShoppingCart size={32} />
                View Cart ({cartCount})
              </Link>

              {/* Logout in Mobile */}
              {isLoggedIn && (
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/login";
                  }}
                  style={mobileLogoutStyle}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* CSS Animations & Responsive */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 71, 87, 0.7);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(255, 71, 87, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 71, 87, 0);
          }
        }

        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};

// Styles
const navLinkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "18px",
  fontWeight: "600",
  transition: "all 0.3s",
};

const cartBadgeStyle = {
  position: "absolute",
  top: "-10px",
  right: "-12px",
  background: "#ff4757",
  color: "white",
  fontSize: "13px",
  fontWeight: "bold",
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  animation: "pulse 2s infinite",
};

const avatarStyle = {
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #ffe066, #ff6b6b)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontSize: "20px",
  fontWeight: "bold",
  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  cursor: "pointer",
};

const mobileToggleStyle = {
  display: "none",
  background: "none",
  border: "none",
  cursor: "pointer",
};

const mobileBackdrop = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.6)",
  backdropFilter: "blur(8px)",
  zIndex: 999,
};

const mobileMenuStyle = {
  position: "fixed",
  top: 0,
  right: 0,
  width: "300px",
  height: "100vh",
  background: "linear-gradient(135deg, #8c5fc3ff, #500f89ff)",
  zIndex: 1000,
  padding: "100px 30px 40px",
  boxShadow: "-10px 0 40px rgba(0,0,0,0.4)",
  animation: "slideIn 0.4s ease-out",
};

const mobileAvatarStyle = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #ffe066, #ff6b6b)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontSize: "36px",
  fontWeight: "bold",
  margin: "0 auto 12px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
  cursor: "pointer",
};

const mobileLinkStyle = {
  color: "white",
  fontSize: "24px",
  fontWeight: "700",
  textDecoration: "none",
  padding: "14px 0",
  borderBottom: "2px solid rgba(255,255,255,0.3)",
};

const mobileCartStyle = {
  color: "white",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "14px",
  fontSize: "22px",
  fontWeight: "bold",
  padding: "20px",
  background: "rgba(255,255,255,0.2)",
  borderRadius: "20px",
};

const mobileLogoutStyle = {
  marginTop: "40px",
  padding: "16px",
  background: "#ff4757",
  color: "white",
  border: "none",
  borderRadius: "16px",
  fontWeight: "bold",
  fontSize: "18px",
  cursor: "pointer",
};

export default Navbar;
