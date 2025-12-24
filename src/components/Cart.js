// pages/ViewCartPage.jsx
import React from "react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ViewCartPage = ({
  cartItems = [],
  removeFromCart,
  addToCart,
  calculateTotal,
}) => {
  const total = calculateTotal ? calculateTotal() : 0;

  const increaseQty = (item) => {
    if (addToCart) addToCart(item);
  };

  const decreaseQty = (itemId) => {
    if (removeFromCart) removeFromCart(itemId);
  };

  // Empty Cart State
  if (cartItems.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          padding: "40px 20px",
        }}
      >
        <ShoppingBag size={90} strokeWidth={1.5} />
        <h1
          style={{
            fontSize: "38px",
            margin: "25px 0 12px",
            fontWeight: "bold",
          }}
        >
          Your Cart is Empty
        </h1>
        <p style={{ fontSize: "19px", opacity: 0.9, maxWidth: "420px" }}>
          Add some delicious combos and enjoy free delivery before 12 PM!
        </p>
        <Link
          to="/menu"
          style={{
            marginTop: "35px",
            padding: "16px 45px",
            background: "white",
            color: "#667eea",
            borderRadius: "50px",
            fontWeight: "bold",
            fontSize: "19px",
            textDecoration: "none",
            boxShadow: "0 12px 35px rgba(0,0,0,0.3)",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "translateY(-4px)")}
          onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "100px 20px 140px",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* Title */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "40px",
            color: "white",
            marginBottom: "35px",
            fontWeight: "900",
          }}
        >
          Your Cart
        </h1>

        {/* Cart Card */}
        <div
          style={{
            background: "rgba(255,255,255,0.97)",
            borderRadius: "28px",
            overflow: "hidden",
            boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
          }}
        >
          {/* Cart Items */}
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                padding: "22px",
                borderBottom: "1px solid #eee",
                display: "flex",
                alignItems: "center",
                gap: "18px",
              }}
            >
              {/* Item Image */}
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  flexShrink: 0,
                  background: "#f0f0f0",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={item.img || "https://via.placeholder.com/100"}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Item Details */}
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: "19px",
                    fontWeight: "bold",
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: "#667eea",
                    fontWeight: "bold",
                    fontSize: "17px",
                  }}
                >
                  ₹{item.price} each
                </p>
              </div>

              {/* Quantity Controls */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  background: "#f8f9fa",
                  padding: "10px",
                  borderRadius: "16px",
                }}
              >
                <button
                  onClick={() => decreaseQty(item._id)}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "#ddd",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Minus size={20} />
                </button>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    minWidth: "36px",
                    textAlign: "center",
                  }}
                >
                  {item.quantity}
                </span>
                <button
                  onClick={() => increaseQty(item)}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    border: "none",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* Price & Remove */}
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  ₹{item.price * item.quantity}
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  style={{
                    marginTop: "10px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#e74c3c",
                    padding: "8px",
                  }}
                >
                  <Trash2 size={24} />
                </button>
              </div>
            </div>
          ))}

          {/* Total & Checkout */}
          <div
            style={{
              padding: "30px 25px",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              color: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "26px",
                fontWeight: "bold",
                marginBottom: "25px",
              }}
            >
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <Link
              to="/order"
              style={{
                display: "block",
                textAlign: "center",
                background: "white",
                color: "#667eea",
                padding: "18px",
                borderRadius: "50px",
                fontSize: "20px",
                fontWeight: "bold",
                textDecoration: "none",
                boxShadow: "0 12px 35px rgba(0,0,0,0.3)",
                transition: "all 0.3s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
              }}
              onMouseEnter={(e) =>
                (e.target.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
            >
              Proceed to Checkout
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>

        {/* Back to Menu */}
        <div style={{ textAlign: "center", marginTop: "35px" }}>
          <Link
            to="/menu"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "17px",
              opacity: 0.9,
              fontWeight: "500",
            }}
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewCartPage;
