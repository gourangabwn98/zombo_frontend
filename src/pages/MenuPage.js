// src/pages/MenuPage.jsx
import React, { useState, useEffect } from "react";
import { Search, Filter, ShoppingCart, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://zombo.onrender.com";

const MenuPage = ({ addToCart, removeFromCart, getQuantity, cartItems }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        setError("");
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        if (filterCategory) params.append("category", filterCategory);
        const url = `${API_BASE_URL}/api/menu?${params.toString()}`;
        const res = await fetch(url);
        const json = await res.json();
        if (json.success) {
          setMenuItems(json.data);
        } else {
          setError("Failed to load menu");
        }
      } catch (err) {
        console.error(err);
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, [searchTerm, filterCategory]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) {
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
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            border: "6px solid transparent",
            borderTop: "6px solid white",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            marginBottom: "20px",
          }}
        />
        <p style={{ fontSize: "20px" }}>Loading delicious items...</p>
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

  if (error) {
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
          padding: "20px",
        }}
      >
        <p style={{ fontSize: "22px" }}>⚠️ {error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: "20px",
            padding: "14px 30px",
            background: "white",
            color: "#667eea",
            border: "none",
            borderRadius: "50px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        paddingBottom: totalItems > 0 ? "140px" : "40px",
      }}
    >
      {/* Sticky Header */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          padding: "20px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "38px",
              fontWeight: "900",
              background: "linear-gradient(135deg, #ffe066, #ff6b6b, #feca57)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ZOMBO
          </h1>
          <div
            style={{
              background: "linear-gradient(135deg, #ff4757, #ff6b6b)",
              color: "white",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Free Delivery before 12 PM
          </div>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: "12px" }}>
          <Search
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#999",
            }}
            size={22}
          />
          <input
            type="text"
            placeholder="Search combos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "85%",
              padding: "16px 16px 16px 50px",
              borderRadius: "16px",
              border: "2px solid #e0e0e0",
              fontSize: "16px",
              outline: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#667eea")}
            onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
          />
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            background: showFilter ? "#667eea" : "#f5f5f5",
            color: showFilter ? "white" : "#333",
            border: "none",
            borderRadius: "12px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          <Filter size={18} />
          Filter
        </button>

        {showFilter && (
          <div style={{ marginTop: "12px" }}>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: "12px",
                border: "2px solid #e0e0e0",
                fontSize: "16px",
                background: "white",
              }}
            >
              <option value="">All Items</option>
              <option value="Main Course">Main Course</option>
              <option value="Combo">Combo</option>
            </select>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        {menuItems.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "white",
              padding: "60px 20px",
            }}
          >
            <p style={{ fontSize: "20px" }}>No items found</p>
          </div>
        ) : (
          menuItems.map((item) => {
            const qty = getQuantity ? getQuantity(item._id) : 0;
            const isCombo = item.category === "Combo";

            return (
              <div
                key={item._id}
                style={{
                  background: "white",
                  borderRadius: "24px",
                  marginBottom: "20px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 50px rgba(0,0,0,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(0,0,0,0.15)";
                }}
              >
                <div style={{ display: "flex", gap: "18px", padding: "20px" }}>
                  <div
                    style={{
                      width: "130px",
                      height: "130px",
                      borderRadius: "18px",
                      overflow: "hidden",
                      flexShrink: 0,
                      background: "#f5f5f5",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>

                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          margin: "0 0 8px",
                          fontSize: "21px",
                          fontWeight: "bold",
                        }}
                      >
                        {item.name}
                      </h3>
                      <p
                        style={{
                          margin: "0 0 10px",
                          fontSize: "14.5px",
                          color: "#666",
                          lineHeight: "1.5",
                        }}
                      >
                        {item.description}
                      </p>

                      {/* Buy 1 Get 1 Badge for Combos */}
                      {isCombo && (
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            background:
                              "linear-gradient(135deg, #ff6b6b, #ee5a52)",
                            color: "white",
                            padding: "6px 12px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            marginBottom: "12px",
                            alignSelf: "flex-start",
                          }}
                        >
                          Buy 1 Get 1 Free
                        </div>
                      )}

                      <div
                        style={{
                          fontSize: "24px",
                          fontWeight: "bold",
                          color: "#667eea",
                        }}
                      >
                        ₹{item.price}
                      </div>
                    </div>

                    {qty > 0 ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "18px",
                          marginTop: "14px",
                        }}
                      >
                        <button
                          onClick={() => removeFromCart(item._id)}
                          style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            background: "#f0f0f0",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "22px",
                            fontWeight: "bold",
                            color: "#667eea",
                          }}
                        >
                          <Minus size={20} />
                        </button>
                        <span
                          style={{
                            fontSize: "22px",
                            fontWeight: "bold",
                            minWidth: "40px",
                            textAlign: "center",
                          }}
                        >
                          {qty}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg, #667eea, #764ba2)",
                            border: "none",
                            color: "white",
                            cursor: "pointer",
                          }}
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        style={{
                          marginTop: "14px",
                          padding: "16px 32px",
                          background:
                            "linear-gradient(135deg, #667eea, #764ba2)",
                          color: "white",
                          border: "none",
                          borderRadius: "50px",
                          fontSize: "17px",
                          fontWeight: "bold",
                          cursor: "pointer",
                          transition: "all 0.3s",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.transform = "scale(1.05)")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.transform = "scale(1)")
                        }
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Floating Cart Bar */}
      {totalItems > 0 && (
        <Link
          to="/view-cart"
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            right: "20px",
            maxWidth: "600px",
            margin: "0 auto",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
            padding: "22px 28px",
            borderRadius: "24px",
            boxShadow: "0 15px 40px rgba(102, 126, 234, 0.5)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1000,
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                background: "rgba(255,255,255,0.25)",
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <ShoppingCart size={30} />
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "#ff4757",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  fontSize: "14px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {totalItems}
              </span>
            </div>
            <div>
              <div style={{ fontSize: "16px", opacity: 0.9 }}>
                {totalItems} item{totalItems > 1 ? "s" : ""}
              </div>
              <div style={{ fontSize: "26px", fontWeight: "bold" }}>
                ₹{totalPrice}
              </div>
            </div>
          </div>
          <div style={{ fontSize: "20px" }}>View Cart →</div>
        </Link>
      )}
    </div>
  );
};

export default MenuPage;
