// pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  QrCode,
  Clock,
  Truck,
  Percent,
  Utensils,
  IndianRupee,
} from "lucide-react";

const Home = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        color: "white",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating Background Orbs */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          right: "-150px",
          width: "500px",
          height: "500px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "50%",
          animation: "float 20s infinite linear",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-200px",
          left: "-200px",
          width: "600px",
          height: "600px",
          background: "rgba(255,255,255,0.06)",
          borderRadius: "50%",
          animation: "float 30s infinite reverse linear",
        }}
      />

      {/* Main Card */}
      <div
        style={{
          background: "rgba(255,255,255,0.16)",
          backdropFilter: "blur(20px)",
          borderRadius: "32px",
          padding: "50px 30px",
          maxWidth: "560px",
          width: "100%",
          boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.25)",
          animation: "fadeInUp 1.3s ease-out",
        }}
      >
        {/* Logo & Name */}
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              width: 90,
              height: 90,
              background: "linear-gradient(135deg, #ff6b6b, #feca57)",
              borderRadius: "50%",
              margin: "0 auto 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(255,107,107,0.4)",
            }}
          >
            <Utensils size={48} color="white" />
          </div>
          <h1
            style={{
              fontSize: "52px",
              margin: "0 0 12px",
              fontWeight: "900",
              background: "linear-gradient(135deg, #ffe066, #ff6b6b, #feca57)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "1px",
            }}
          >
            ZOMBO
          </h1>
          <p
            style={{
              fontSize: "20px",
              margin: "0",
              opacity: 0.9,
              fontWeight: "500",
            }}
          >
            Made for Students
          </p>
        </div>

        {/* Tagline */}
        <h2
          style={{
            fontSize: "28px",
            margin: "30px 0 20px",
            fontWeight: "bold",
          }}
        >
          Combo Meals Starting at Just ₹49!
        </h2>

        {/* Offers Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            margin: "30px 0",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "18px",
              borderRadius: "20px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            <Percent size={36} color="#ffe066" />
            <h3 style={{ margin: "12px 0 8px", fontSize: "18px" }}>50% OFF</h3>
            <p style={{ margin: 0, fontSize: "14px", opacity: 0.9 }}>
              On Your First Order!
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "18px",
              borderRadius: "20px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            <Truck size={36} color="#4ade80" />
            <h3 style={{ margin: "12px 0 8px", fontSize: "18px" }}>
              FREE Delivery
            </h3>
            <p style={{ margin: 0, fontSize: "13px", opacity: 0.9 }}>
              Before 12 PM or Above ₹200
            </p>
          </div>
        </div>

        {/* Delivery Charge Info */}
        <div
          style={{
            background: "rgba(255,107,107,0.25)",
            padding: "16px",
            borderRadius: "16px",
            margin: "20px 0",
            border: "1px dashed rgba(255,107,107,0.5)",
          }}
        >
          <p style={{ margin: 0, fontSize: "15px" }}>
            Only <strong>₹20 delivery charge</strong> otherwise
          </p>
        </div>

        {/* QR Code */}
        <div
          style={{
            margin: "40px auto",
            width: "240px",
            height: "240px",
            background: "white",
            borderRadius: "28px",
            padding: "16px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-12px) scale(1.06)";
            e.currentTarget.style.boxShadow = "0 30px 70px rgba(0,0,0,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.4)";
          }}
        >
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://your-zombo-app.com/menu"
            alt="Scan to Order"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "18px",
            }}
          />
        </div>

        <p
          style={{ fontSize: "19px", margin: "20px 0 10px", fontWeight: "600" }}
        >
          Scan with Phone Camera
        </p>
        <p style={{ opacity: 0.9, margin: "0 0 40px" }}>
          Instant menu • No app download needed
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Link
            to="/menu"
            style={{
              padding: "18px",
              background: "white",
              color: "#667eea",
              borderRadius: "50px",
              fontSize: "20px",
              fontWeight: "bold",
              textDecoration: "none",
              boxShadow: "0 12px 35px rgba(0,0,0,0.3)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.target.style.transform = "translateY(-6px)")
            }
            onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
          >
            View Menu & Order Now
          </Link>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "10px",
              fontSize: "15px",
              opacity: 0.9,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Clock size={20} /> Lunch & Dinner
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <IndianRupee size={20} /> Pocket-Friendly
            </span>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(60px, -60px) rotate(180deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
        @media (max-width: 480px) {
          h1 {
            font-size: 42px !important;
          }
          h2 {
            font-size: 24px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
