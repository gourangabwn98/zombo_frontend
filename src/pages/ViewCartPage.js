// pages/ViewCartPage.jsx
import React, { useEffect, useState } from "react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const ViewCartPage = ({
  cartItems = [],
  removeFromCart,
  addToCart,
  calculateTotal,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state || {};

  const [loading, setLoading] = useState(false);

  // Check if user is logged in via localStorage (most reliable)
  const storedUser = localStorage.getItem("zombo_user");
  const isLoggedIn = !!storedUser; // True if user exists in localStorage

  const total = calculateTotal();

  // Welcome animation when coming from register/login
  useEffect(() => {
    if (name || (location.state && location.state.fromAuth)) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [name, location.state]);

  const handleProceedToOrder = () => {
    navigate("/order", {
      state: {
        totalAmount: total,
        cartItems: cartItems,
      },
    });
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // Or "/register" if you prefer
  };

  // Loading Welcome Screen
  if (loading) {
    return (
      <div style={loadingScreenStyle}>
        <div style={loadingCardStyle}>
          <div style={spinnerStyle}></div>
          <h2
            style={{
              margin: "20px 0 10px",
              fontSize: "26px",
              fontWeight: "bold",
            }}
          >
            Welcome back
            {name ? `, ${JSON.parse(storedUser || "{}").name || name}!` : ""}!
          </h2>
          <p style={{ opacity: 0.9 }}>Your cart is ready 🛒</p>
        </div>

        <style jsx>{`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  // Empty Cart
  if (cartItems.length === 0) {
    return (
      <div style={emptyCartStyle}>
        <ShoppingBag size={90} strokeWidth={1.5} color="white" />
        <h1 style={{ fontSize: "36px", margin: "30px 0 10px", color: "white" }}>
          Your Cart is Empty
        </h1>
        <p
          style={{
            fontSize: "18px",
            opacity: 0.9,
            maxWidth: "400px",
            color: "white",
          }}
        >
          Add delicious items from the menu and they’ll appear here!
        </p>
        <Link to="/menu" style={exploreBtnStyle}>
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={titleStyle}>Your Cart</h1>

        <div style={cartCardStyle}>
          {cartItems.map((item) => (
            <div key={item._id} style={cartItemStyle}>
              <div style={itemImageWrapper}>
                <img
                  src={item.img || "https://via.placeholder.com/90"}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {item.name}
                </h3>
                <p style={{ margin: 0, color: "#667eea", fontWeight: "bold" }}>
                  ₹{item.price} each
                </p>
              </div>

              <div style={quantityControlStyle}>
                <button
                  onClick={() => removeFromCart(item._id)}
                  style={qtyBtnMinus}
                >
                  <Minus size={18} />
                </button>
                <span style={qtyDisplay}>{item.quantity}</span>
                <button onClick={() => addToCart(item)} style={qtyBtnPlus}>
                  <Plus size={18} />
                </button>
              </div>

              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  ₹{item.price * item.quantity}
                </div>
                <button
                  onClick={() => removeFromCart(item._id, true)} // true = remove all
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    marginTop: "8px",
                  }}
                >
                  <Trash2 size={20} color="#e74c3c" />
                </button>
              </div>
            </div>
          ))}

          {/* Total & Action Button */}
          <div style={totalSectionStyle}>
            <div style={totalRowStyle}>
              <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                Total
              </span>
              <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                ₹{total}
              </span>
            </div>

            {isLoggedIn ? (
              <button onClick={handleProceedToOrder} style={proceedBtnStyle}>
                Proceed to Order
                <ArrowRight size={20} style={{ marginLeft: "10px" }} />
              </button>
            ) : (
              <button onClick={handleLoginRedirect} style={loginBtnStyle}>
                Login to Continue
              </button>
            )}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Link to="/menu" style={continueShoppingStyle}>
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

// Styles
const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  padding: "100px 20px 140px",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "36px",
  color: "white",
  marginBottom: "30px",
  fontWeight: "bold",
};

const cartCardStyle = {
  background: "rgba(255,255,255,0.97)",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
};

const cartItemStyle = {
  padding: "20px",
  borderBottom: "1px solid #eee",
  display: "flex",
  alignItems: "center",
  gap: "15px",
};

const itemImageWrapper = {
  width: "90px",
  height: "90px",
  borderRadius: "12px",
  overflow: "hidden",
  flexShrink: 0,
  background: "#f0f0f0",
};

const quantityControlStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  background: "#f8f9fa",
  padding: "8px",
  borderRadius: "12px",
};

const qtyBtnMinus = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  background: "#ddd",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

const qtyBtnPlus = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  border: "none",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

const qtyDisplay = {
  fontSize: "18px",
  fontWeight: "bold",
  minWidth: "30px",
  textAlign: "center",
};

const totalSectionStyle = {
  padding: "25px 20px",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  color: "white",
};

const totalRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const proceedBtnStyle = {
  width: "100%",
  background: "white",
  color: "#667eea",
  padding: "16px",
  borderRadius: "50px",
  fontSize: "18px",
  fontWeight: "bold",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
};

const loginBtnStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.2)",
  color: "white",
  padding: "16px",
  borderRadius: "50px",
  fontSize: "18px",
  fontWeight: "bold",
  border: "2px solid white",
  cursor: "pointer",
};

const continueShoppingStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
  opacity: 0.9,
};

const loadingScreenStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
};

const loadingCardStyle = {
  background: "rgba(255,255,255,0.15)",
  padding: "40px",
  borderRadius: "20px",
  backdropFilter: "blur(10px)",
  textAlign: "center",
};

const spinnerStyle = {
  width: 80,
  height: 80,
  border: "6px solid transparent",
  borderTop: "6px solid white",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  margin: "0 auto 20px",
};

const emptyCartStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  textAlign: "center",
  padding: "40px 20px",
};

const exploreBtnStyle = {
  marginTop: "30px",
  padding: "16px 40px",
  background: "white",
  color: "#667eea",
  borderRadius: "50px",
  fontWeight: "bold",
  fontSize: "18px",
  textDecoration: "none",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

export default ViewCartPage;
