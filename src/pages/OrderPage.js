// pages/OrderPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, CreditCard, CheckCircle, Truck } from "lucide-react";

const API_BASE_URL = "https://zombo.onrender.com"; // Change to production URL later

const OrderPage = ({ clearCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount = 0, cartItems = [] } = location.state || {};

  const [address, setAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState("");

  const deliveryCharge = totalAmount > 200 ? 0 : 40;
  const finalTotal = totalAmount + deliveryCharge - discount;

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (code === "BALAJI50") {
      setDiscount(50);
      alert("Coupon applied! ₹50 off");
    } else if (code === "FREEDELIVERY") {
      setDiscount(deliveryCharge);
      alert("Free delivery applied!");
    } else {
      alert("Invalid coupon code");
    }
    setCoupon("");
  };

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert("Please enter your delivery address");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setPlacingOrder(true);
    setError("");

    const token = localStorage.getItem("zombo_token");
    if (!token) {
      alert("Please login to place order");
      navigate("/login");
      return;
    }

    try {
      const orderItems = cartItems.map((item) => ({
        menuItem: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: orderItems,
          totalAmount: finalTotal,
          address: address.trim(), // Send address to backend
          discountApplied: discount,
        }),
      });

      const json = await response.json();

      if (json.success) {
        setOrderPlaced(true);

        // === CLEAR CART COMPLETELY ===
        if (typeof clearCart === "function") {
          clearCart(); // From context or parent
        }

        // Also clear any local cart storage (common in many apps)
        localStorage.removeItem("cart");
        localStorage.removeItem("cartItems"); // if you use this key
        sessionStorage.removeItem("cart");

        // Redirect after success screen
        setTimeout(() => {
          navigate("/menu", { replace: true }); // replace to prevent going back to order page
        }, 3500);
      } else {
        setError(json.message || "Failed to place order. Please try again.");
        setPlacingOrder(false);
      }
    } catch (err) {
      console.error("Order error:", err);
      setError("Network error. Please check your connection and try again.");
      setPlacingOrder(false);
    }
  };

  // Success Screen
  if (orderPlaced) {
    return (
      <div style={successScreenStyle}>
        <div style={successCardStyle}>
          <CheckCircle size={100} color="#4ade80" strokeWidth={3} />
          <h1
            style={{ fontSize: "36px", margin: "30px 0", fontWeight: "bold" }}
          >
            Order Placed Successfully!
          </h1>
          <p style={{ fontSize: "20px", opacity: 0.9, marginBottom: "30px" }}>
            Your delicious food is being prepared and on the way!
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "18px",
            }}
          >
            <Truck size={28} />
            <span>Estimated delivery: 30-45 minutes</span>
          </div>
          <p style={{ marginTop: "30px", fontSize: "16px", opacity: 0.8 }}>
            Redirecting you to menu...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 20px" }}>
        <h1 style={titleStyle}>Complete Your Order</h1>

        {error && (
          <div
            style={{
              color: "#ff6b6b",
              textAlign: "center",
              margin: "20px 0",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {error}
          </div>
        )}

        <div style={mainCardStyle}>
          {/* Order Summary */}
          <div style={{ padding: "25px" }}>
            <h2
              style={{
                margin: "0 0 20px",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Your Order ({cartItems.length}{" "}
              {cartItems.length === 1 ? "item" : "items"})
            </h2>
            {cartItems.map((item) => (
              <div key={item._id} style={itemRowStyle}>
                <div>
                  <span style={{ fontWeight: "bold" }}>{item.name}</span>
                  <span style={{ color: "#666", marginLeft: "10px" }}>
                    × {item.quantity}
                  </span>
                </div>
                <span style={{ fontWeight: "bold" }}>
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Delivery Address */}
          <div style={{ padding: "25px", background: "#f8f9fa" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "15px",
              }}
            >
              <MapPin size={24} color="#667eea" />
              <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
                Delivery Address
              </h3>
            </div>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Flat/House no., Building, Street, Landmark (full address)"
              style={addressInputStyle}
              rows="4"
            />
          </div>

          {/* Price Breakdown */}
          <div style={{ padding: "25px" }}>
            <h3
              style={{
                margin: "0 0 15px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Price Details
            </h3>
            <div style={priceRowStyle}>
              <span>Items Total</span>
              <span>₹{totalAmount}</span>
            </div>
            <div style={priceRowStyle}>
              <span>Delivery Charge</span>
              <span
                style={{ color: deliveryCharge === 0 ? "#4ade80" : "#333" }}
              >
                {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
              </span>
            </div>
            {discount > 0 && (
              <div
                style={{
                  ...priceRowStyle,
                  color: "#4ade80",
                  fontWeight: "bold",
                }}
              >
                <span>Discount Applied</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div
              style={{ borderTop: "2px dashed #ddd", margin: "20px 0 15px" }}
            ></div>
            <div style={totalRowStyle}>
              <span style={{ fontSize: "20px" }}>To Pay</span>
              <span style={{ fontSize: "24px", color: "#667eea" }}>
                ₹{finalTotal}
              </span>
            </div>
          </div>

          {/* Coupon Section */}
          <div style={{ padding: "0 25px 25px" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                style={couponInputStyle}
                disabled={discount > 0}
              />
              <button
                onClick={applyCoupon}
                style={applyBtnStyle}
                disabled={discount > 0}
              >
                {discount > 0 ? "Applied" : "Apply"}
              </button>
            </div>
            <p style={{ fontSize: "13px", color: "#666", marginTop: "10px" }}>
              Try: <strong>BALAJI50</strong> (₹50 off) or{" "}
              <strong>FREEDELIVERY</strong>
            </p>
          </div>

          {/* Place Order Button */}
          <div style={footerStyle}>
            <button
              onClick={handlePlaceOrder}
              disabled={
                placingOrder || cartItems.length === 0 || !address.trim()
              }
              style={placeOrderBtnStyle(
                placingOrder || cartItems.length === 0 || !address.trim()
              )}
            >
              {placingOrder ? (
                "Placing Order..."
              ) : (
                <>
                  <CreditCard size={24} />
                  Place Order • ₹{finalTotal}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles (unchanged, just cleaned up a bit)
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

const mainCardStyle = {
  background: "rgba(255,255,255,0.97)",
  borderRadius: "24px",
  overflow: "hidden",
  boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
};

const itemRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "14px 0",
  borderBottom: "1px solid #eee",
};

const addressInputStyle = {
  width: "100%",
  padding: "15px",
  borderRadius: "12px",
  border: "2px solid #ddd",
  fontSize: "16px",
  resize: "vertical",
  fontFamily: "inherit",
};

const priceRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "12px",
  fontSize: "16px",
};

const totalRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "22px",
  fontWeight: "bold",
};

const couponInputStyle = {
  flex: 1,
  padding: "14px",
  borderRadius: "12px",
  border: "2px solid #ddd",
  fontSize: "16px",
};

const applyBtnStyle = {
  padding: "0 24px",
  background: "#667eea",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontWeight: "bold",
  cursor: "pointer",
};

const footerStyle = {
  padding: "30px 25px",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
};

const placeOrderBtnStyle = (disabled) => ({
  width: "100%",
  padding: "18px",
  background: "white",
  color: "#667eea",
  border: "none",
  borderRadius: "50px",
  fontSize: "20px",
  fontWeight: "bold",
  cursor: disabled ? "not-allowed" : "pointer",
  opacity: disabled ? 0.6 : 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
});

const successScreenStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px",
  textAlign: "center",
  color: "white",
};

const successCardStyle = {
  background: "rgba(255,255,255,0.15)",
  padding: "60px 40px",
  borderRadius: "30px",
  backdropFilter: "blur(15px)",
  maxWidth: "500px",
  width: "100%",
};

export default OrderPage;
