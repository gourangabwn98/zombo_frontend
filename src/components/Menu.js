// pages/MenuPage.jsx
import React, { useState } from "react";
import { Search, Plus, Minus, ShoppingCart, Filter } from "lucide-react";

const MenuPage = ({ addToCart, removeFromCart, getQuantity, cartItems }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  // Hardcoded menu items (perfect for students & hostel)
  const menuItems = [
    {
      _id: "1",
      name: "Polau + Chicken",
      description: "Full plate polau with tender chicken curry",
      price: 99,
      category: "Main Course",
      img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80",
    },
    {
      _id: "2",
      name: "Polau + Aloo Dom",
      description: "Aromatic polau with spicy potato curry",
      price: 69,
      category: "Main Course",
      img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80",
    },
    {
      _id: "3",
      name: "Steam Rice + Chicken",
      description: "Steamed rice with rich chicken gravy",
      price: 79,
      category: "Main Course",
      img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80",
    },
    {
      _id: "4",
      name: "Steam Rice + Aloo Dom",
      description: "Light rice with homestyle aloo dom",
      price: 49,
      category: "Main Course",
      img: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=400&q=80",
    },
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "" || item.category === filterCategory)
    );
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        paddingBottom: "120px",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
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
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "36px",
              background: "linear-gradient(135deg, #ffe066, #ff6b6b, #feca57)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "900",
            }}
          >
            ZOMBO
          </h1>
          <span
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
          </span>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: "12px" }}>
          <Search
            style={{
              position: "absolute",
              left: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#999",
              width: "20px",
              height: "20px",
            }}
          />
          <input
            type="text"
            placeholder="Search your favorite combo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 15px 14px 45px",
              border: "2px solid #e0e0e0",
              borderRadius: "16px",
              fontSize: "16px",
              outline: "none",
              boxSizing: "border-box",
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
            padding: "10px 18px",
            background: showFilter ? "#667eea" : "#f5f5f5",
            color: showFilter ? "white" : "#333",
            border: "none",
            borderRadius: "12px",
            fontSize: "15px",
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
                padding: "12px 16px",
                border: "2px solid #e0e0e0",
                borderRadius: "12px",
                fontSize: "16px",
                background: "white",
                cursor: "pointer",
              }}
            >
              <option value="">All Categories</option>
              <option value="Main Course">Main Course</option>
            </select>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        {filteredMenuItems.map((item) => {
          const qty = getQuantity ? getQuantity(item._id) : 0;

          return (
            <div
              key={item._id}
              style={{
                background: "white",
                borderRadius: "20px",
                marginBottom: "18px",
                overflow: "hidden",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
              }}
            >
              <div style={{ display: "flex", gap: "18px", padding: "18px" }}>
                <div
                  style={{
                    width: "130px",
                    height: "130px",
                    flexShrink: 0,
                    borderRadius: "16px",
                    overflow: "hidden",
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
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{
                        margin: "0 0 12px",
                        fontSize: "14px",
                        color: "#666",
                        lineHeight: "1.5",
                      }}
                    >
                      {item.description}
                    </p>
                    <div
                      style={{
                        fontSize: "22px",
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
                        gap: "16px",
                        marginTop: "12px",
                      }}
                    >
                      <button
                        onClick={() => removeFromCart(item._id)}
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                          border: "none",
                          background: "#f0f0f0",
                          color: "#667eea",
                          cursor: "pointer",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        -
                      </button>
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          minWidth: "36px",
                          textAlign: "center",
                        }}
                      >
                        {qty}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                          border: "none",
                          background:
                            "linear-gradient(135deg, #667eea, #764ba2)",
                          color: "white",
                          cursor: "pointer",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item)}
                      style={{
                        marginTop: "12px",
                        padding: "14px 28px",
                        background: "linear-gradient(135deg, #667eea, #764ba2)",
                        color: "white",
                        border: "none",
                        borderRadius: "50px",
                        fontSize: "16px",
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
        })}
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            right: "20px",
            maxWidth: "600px",
            margin: "0 auto",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
            padding: "20px 25px",
            borderRadius: "20px",
            boxShadow: "0 15px 40px rgba(102, 126, 234, 0.5)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1000,
            cursor: "pointer",
          }}
          onClick={() => (window.location.href = "/view-cart")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                background: "rgba(255,255,255,0.25)",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <ShoppingCart size={26} />
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  background: "#ff4757",
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  fontSize: "13px",
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
              <div style={{ fontSize: "15px", opacity: 0.9 }}>
                {totalItems} item{totalItems > 1 ? "s" : ""}
              </div>
              <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                ₹{totalPrice}
              </div>
            </div>
          </div>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>View Cart</div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
