import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";

const Navbar = ({ cartCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const userData = JSON.parse(localStorage.getItem("zombo_user"));
  const isLoggedIn = !!userData;
  const userInitial = userData?.name
    ? userData.name.charAt(0).toUpperCase()
    : "?";

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Main Navbar - Fixed Top */}
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
          padding: "0 5%",
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
            gap: "12px",
          }}
        >
          <img
            src="/assets/images/zombo-logo.png"
            alt="ZOMBO"
            style={{ height: "55px", width: "auto", objectFit: "contain" }}
          />
          <span
            style={{
              fontSize: "30px",
              fontWeight: "900",
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
          style={{ display: "flex", alignItems: "center", gap: "36px" }}
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

          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <Link
              to="/view-cart"
              style={{ position: "relative", textDecoration: "none" }}
            >
              <ShoppingCart size={26} color="white" strokeWidth={2.5} />
              {cartCount > 0 && <span style={cartBadgeStyle}>{cartCount}</span>}
            </Link>

            {isLoggedIn && (
              <Link to="/profile">
                <div style={avatarStyle} title={`Hi, ${userData.name}!`}>
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
            <X size={30} color="white" />
          ) : (
            <Menu size={30} color="white" />
          )}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <>
          <div style={mobileBackdrop} onClick={closeMenu} />
          <div style={mobileMenuStyle}>
            {/* User Section */}
            {isLoggedIn && (
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "30px",
                  paddingTop: "20px",
                }}
              >
                <Link to="/profile" onClick={closeMenu}>
                  <div style={mobileAvatarStyle}>{userInitial}</div>
                </Link>
                <p
                  style={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "600",
                    margin: "12px 0 8px",
                  }}
                >
                  Hi, {userData.name}!
                </p>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  style={{
                    color: "#ffe066",
                    fontSize: "15px",
                    textDecoration: "underline",
                  }}
                >
                  View Profile →
                </Link>
              </div>
            )}

            {/* Links */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <Link to="/" onClick={closeMenu} style={mobileLinkStyle}>
                Home
              </Link>
              <Link to="/menu" onClick={closeMenu} style={mobileLinkStyle}>
                Menu
              </Link>
              <Link
                to="/ordershistory"
                onClick={closeMenu}
                style={mobileLinkStyle}
              >
                Orders
              </Link>

              <Link to="/view-cart" onClick={closeMenu} style={mobileCartStyle}>
                <ShoppingCart size={28} />
                View Cart {cartCount > 0 && `(${cartCount})`}
              </Link>

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

      {/* Responsive CSS */}
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
            box-shadow: 0 0 0 10px rgba(255, 71, 87, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 71, 87, 0);
          }
        }

        /* Hide desktop on mobile, show hamburger */
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }

        @media (min-width: 769px) {
          .mobile-toggle {
            display: none !important;
          }
        }

        /* Extra small phones */
        @media (max-width: 480px) {
          nav {
            padding: 0 4%;
            height: 65px;
          }
          nav img {
            height: 48px;
          }
          nav span {
            font-size: 26px;
          }
        }
      `}</style>
    </>
  );
};

// Styles (unchanged but slightly refined)
const navLinkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "18px",
  fontWeight: "600",
  transition: "all 0.3s",
};

const cartBadgeStyle = {
  position: "absolute",
  top: "-8px",
  right: "-10px",
  background: "#ff4757",
  color: "white",
  fontSize: "12px",
  fontWeight: "bold",
  minWidth: "20px",
  height: "20px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 4px",
  animation: "pulse 2s infinite",
};

const avatarStyle = {
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #ffe066, #ff6b6b)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontSize: "19px",
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
  inset: 0,
  background: "rgba(0,0,0,0.7)",
  backdropFilter: "blur(10px)",
  zIndex: 999,
};

const mobileMenuStyle = {
  position: "fixed",
  top: 0,
  right: 0,
  width: "80%",
  maxWidth: "320px",
  height: "100vh",
  background: "linear-gradient(135deg, #8c5fc3ff, #500f89ff)",
  zIndex: 1000,
  padding: "80px 30px 40px",
  boxShadow: "-15px 0 50px rgba(0,0,0,0.5)",
  animation: "slideIn 0.4s ease-out",
  overflowY: "auto",
};

const mobileAvatarStyle = {
  ...avatarStyle,
  width: "90px",
  height: "90px",
  fontSize: "38px",
  margin: "0 auto",
};

const mobileLinkStyle = {
  color: "white",
  fontSize: "22px",
  fontWeight: "700",
  textDecoration: "none",
  padding: "16px 0",
  borderBottom: "1px solid rgba(255,255,255,0.2)",
};

const mobileCartStyle = {
  ...mobileLinkStyle,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
  background: "rgba(255,255,255,0.15)",
  borderRadius: "18px",
  borderBottom: "none",
};

const mobileLogoutStyle = {
  marginTop: "50px",
  padding: "18px",
  background: "#ff4757",
  color: "white",
  border: "none",
  borderRadius: "18px",
  fontWeight: "bold",
  fontSize: "18px",
  cursor: "pointer",
};

export default Navbar;
