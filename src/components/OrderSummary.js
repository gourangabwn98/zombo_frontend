// pages/OrderSummary.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Clock, Truck, CheckCircle, IndianRupee } from "lucide-react";

const API_BASE_URL = "https://zombo.onrender.com"; // Change in production

const OrderSummary = () => {
  const navigate = useNavigate();
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("zombo_token");
      const user = localStorage.getItem("zombo_user");

      // If not logged in, redirect to login
      if (!token || !user) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE_URL}/api/orders/myorders`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const json = await res.json();

        if (json.success) {
          setOrderHistory(json.data);
        } else {
          setError(json.message || "Failed to load orders");
        }
      } catch (err) {
        console.error(err);
        setError("Network error. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Accepted":
        return <Package size={20} color="white" />;
      case "Preparing":
        return <Clock size={20} color="white" />;
      case "Out for Delivery":
        return <Truck size={20} color="white" />;
      case "Delivered":
        return <CheckCircle size={20} color="white" />;
      default:
        return <Package size={20} color="white" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "#667eea";
      case "Preparing":
        return "#f59e0b";
      case "Out for Delivery":
        return "#3b82f6";
      case "Delivered":
        return "#10b981";
      case "Cancelled":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  // Loading State
  if (loading) {
    return (
      <div style={loadingStyle}>
        <div style={{ textAlign: "center" }}>
          <div style={spinnerStyle} />
          <p style={{ fontSize: "20px", marginTop: "20px" }}>
            Loading your orders...
          </p>
        </div>
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div style={errorStyle}>
        <p style={{ fontSize: "22px", textAlign: "center" }}>⚠️ {error}</p>
        <button onClick={() => window.location.reload()} style={retryBtnStyle}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <h1 style={titleStyle}>Your Orders</h1>

        {orderHistory.length === 0 ? (
          <div style={emptyStateStyle}>
            <Package size={80} strokeWidth={1.5} color="white" />
            <h2 style={{ margin: "20px 0", fontSize: "28px", color: "white" }}>
              No Orders Yet!
            </h2>
            <p style={{ fontSize: "18px", opacity: 0.9, color: "white" }}>
              Time to order your first delicious combo!
            </p>
            <button onClick={() => navigate("/menu")} style={orderNowBtnStyle}>
              Order Now
            </button>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {orderHistory.map((order) => {
              const statusColor = getStatusColor(order.status);

              return (
                <div key={order._id} style={orderCardStyle}>
                  {/* Header */}
                  <div
                    style={{
                      ...orderHeaderStyle,
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          margin: "0 0 8px",
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        Order #{order._id.slice(-6).toUpperCase()}
                      </h3>
                      <p
                        style={{
                          margin: 0,
                          opacity: 0.9,
                          fontSize: "14px",
                          color: "white",
                        }}
                      >
                        {new Date(order.orderDate).toLocaleString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        background: statusColor,
                        padding: "10px 16px",
                        borderRadius: "50px",
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div style={{ padding: "20px" }}>
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "12px 0",
                          borderBottom:
                            idx < order.items.length - 1
                              ? "1px dashed #eee"
                              : "none",
                        }}
                      >
                        <span style={{ fontWeight: "500" }}>
                          {item.name || "Item"}
                          <span style={{ color: "#666", marginLeft: "8px" }}>
                            × {item.quantity}
                          </span>
                        </span>
                        <span style={{ fontWeight: "bold", color: "#333" }}>
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}

                    {/* Total */}
                    <div
                      style={{
                        marginTop: "20px",
                        paddingTop: "15px",
                        borderTop: "2px solid #667eea",
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "22px",
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      <span>Total Paid</span>
                      <span style={{ color: "#667eea" }}>
                        <IndianRupee
                          size={24}
                          style={{ verticalAlign: "-4px" }}
                        />
                        {order.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  padding: "100px 20px 40px",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "40px",
  color: "white",
  marginBottom: "40px",
  fontWeight: "bold",
};

const loadingStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
};

const spinnerStyle = {
  width: 80,
  height: 80,
  border: "6px solid transparent",
  borderTop: "6px solid white",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const errorStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  textAlign: "center",
  padding: "20px",
};

const retryBtnStyle = {
  marginTop: "20px",
  padding: "14px 30px",
  background: "white",
  color: "#667eea",
  border: "none",
  borderRadius: "50px",
  fontWeight: "bold",
  cursor: "pointer",
};

const emptyStateStyle = {
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(15px)",
  borderRadius: "24px",
  padding: "60px 30px",
  textAlign: "center",
  color: "white",
  border: "1px solid rgba(255,255,255,0.2)",
};

const orderNowBtnStyle = {
  marginTop: "20px",
  padding: "16px 40px",
  background: "white",
  color: "#667eea",
  border: "none",
  borderRadius: "50px",
  fontWeight: "bold",
  fontSize: "18px",
  cursor: "pointer",
};

const orderCardStyle = {
  background: "rgba(255,255,255,0.97)",
  borderRadius: "24px",
  overflow: "hidden",
  boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
};

const orderHeaderStyle = {
  padding: "20px",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default OrderSummary;
