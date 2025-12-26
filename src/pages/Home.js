import React from "react";
import { Link } from "react-router-dom";
import {
  Percent,
  Truck,
  Clock,
  IndianRupee,
  Utensils,
  Gift,
  Sparkles,
} from "lucide-react";
import SEO from "../components/SEO";

const Home = () => {
  return (
    <>
      <SEO
        title="Zombo - Food Delivery Burdwan | Student Combos from ₹49"
        description="Pocket-friendly food delivery in Burdwan Town for students. Festive Christmas combos starting ₹49, free delivery ,. Order lunch & dinner now!"
        keywords="food delivery burdwan, student food burdwan, cheap food delivery burdwan, zombo food, christmas offers burdwan, combo meals burdwan, online food order burdwan"
      />

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)",
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
        {/* Festive Floating Elements */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            animation: "float 25s infinite linear",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-150px",
            width: "500px",
            height: "500px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "50%",
            animation: "float 35s infinite reverse linear",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            fontSize: "60px",
            opacity: 0.15,
            animation: "float 20s infinite",
          }}
        >
          <Sparkles size={80} />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "15%",
            fontSize: "60px",
            opacity: 0.15,
            animation: "float 28s infinite reverse",
          }}
        >
          <Gift size={80} />
        </div>

        {/* Main Card */}
        <div
          style={{
            background: "rgba(255,255,255,0.16)",
            backdropFilter: "blur(20px)",
            borderRadius: "32px",
            padding: "50px 30px",
            maxWidth: "620px",
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
                width: 100,
                height: 100,
                background: "linear-gradient(135deg, #ef4444, #22c55e)",
                borderRadius: "50%",
                margin: "0 auto 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 30px rgba(239,68,68,0.4)",
              }}
            >
              <Utensils size={56} color="white" />
            </div>
            <h1
              style={{
                fontSize: "56px",
                margin: "0 0 12px",
                fontWeight: "900",
                background:
                  "linear-gradient(135deg, #fefce8, #ef4444, #22c55e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "2px",
              }}
            >
              ZOMBO
            </h1>
            <p
              style={{
                fontSize: "22px",
                margin: "0",
                opacity: 0.9,
                fontWeight: "500",
              }}
            >
              Made for Students • Serving Burdwan Town
            </p>
          </div>

          {/* Service Area */}
          <div
            style={{
              background: "rgba(34, 197, 94, 0.3)",
              padding: "16px",
              borderRadius: "16px",
              margin: "20px 0",
              border: "2px dashed #22c55e",
            }}
          >
            <p style={{ margin: 0, fontSize: "19px", fontWeight: "bold" }}>
              📍 Currently serving in{" "}
              <span style={{ color: "#fbbf24" }}>Burdwan Town</span> only
            </p>
          </div>

          <h2
            style={{
              fontSize: "32px",
              margin: "30px 0 10px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <Gift size={40} color="#fbbf24" />
            Merry Christmas!
            <Sparkles size={40} color="#fbbf24" />
          </h2>

          <h3
            style={{
              fontSize: "28px",
              margin: "20px 0 30px",
              fontWeight: "bold",
            }}
          >
            Festive Combo Meals Starting at Just ₹49!
          </h3>

          {/* 50% OFF Banner */}
          <div
            style={{
              background: "rgba(239,68,68,0.3)",
              padding: "20px",
              borderRadius: "20px",
              margin: "20px 0",
              border: "2px dashed #fbbf24",
            }}
          >
            <p
              style={{
                margin: "0 0 10px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              🎄 Christmas Launch Special:{" "}
              <span style={{ color: "#fbbf24" }}>Buy 1 Get 1</span> on First
              Order Today!
            </p>
          </div>

          {/* NEW: Promocode Highlight */}
          {/* <div
            style={{
              background: "linear-gradient(135deg, #dc2626, #f59e0b)",
              padding: "20px",
              borderRadius: "20px",
              margin: "20px 0",
              boxShadow: "0 10px 30px rgba(220, 38, 38, 0.4)",
              animation: "pulse 2s infinite",
            }}
          >
            <p
              style={{
                margin: "0 0 8px",
                fontSize: "22px",
                fontWeight: "900",
                letterSpacing: "1px",
              }}
            >
              🎅 Use Promo Code:
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "36px",
                fontWeight: "900",
                letterSpacing: "4px",
                textShadow: "0 4px 10px rgba(0,0,0,0.5)",
              }}
            >
              CHRISTMAS50
            </p>
            <p style={{ margin: "8px 0 0", fontSize: "16px", opacity: 0.95 }}>
              Get <strong>50% OFF</strong> instantly at checkout!
            </p>
          </div> */}

          {/* Food Images */}
          <div style={{ margin: "40px 0", fontSize: "14px", opacity: 0.9 }}>
            Treat yourself this Christmas – check out our combos!
          </div>
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              gap: "16px",
              padding: "10px 0",
              scrollbarWidth: "none",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80"
              alt="Chicken Biryani Combo ₹99 - Zombo Food Delivery Burdwan"
              style={{
                borderRadius: "20px",
                width: "280px",
                height: "180px",
                objectFit: "cover",
                flexShrink: 0,
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              }}
            />
            <img
              src="https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=400&q=80"
              alt="Veg Thali Combo ₹69 - Affordable Student Food Burdwan"
              style={{
                borderRadius: "20px",
                width: "280px",
                height: "180px",
                objectFit: "cover",
                flexShrink: 0,
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              }}
            />
            <img
              src="https://img-cdn.publive.online/fit-in/1280x720/filters:format(webp)/elle-india/media/post_attachments/wp-content/uploads/2021/12/feature-8.jpg"
              alt="Christmas Special Dessert Combo - Zombo Burdwan"
              style={{
                borderRadius: "20px",
                width: "280px",
                height: "180px",
                objectFit: "cover",
                flexShrink: 0,
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              }}
            />
            <img
              src="https://restaurantindia.s3.ap-south-1.amazonaws.com/s3fs-public/2025-09/Top%20Rajasthani%20Dishes%20to%20Try%20This%20Festive%20Season.jpg"
              alt="Rajasthani Thali Combo ₹149 - Best Food Delivery Burdwan"
              style={{
                borderRadius: "20px",
                width: "280px",
                height: "180px",
                objectFit: "cover",
                flexShrink: 0,
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              }}
            />
          </div>

          {/* Offers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              margin: "40px 0",
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
              <Percent size={36} color="#fbbf24" />
              <h3 style={{ margin: "12px 0 8px", fontSize: "18px" }}>
                Buy 1 Get 1 Free
              </h3>
              {/* <p style={{ margin: 0, fontSize: "14px", opacity: 0.9 }}>
                With code CHRISTMAS50
              </p> */}
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
            </div>
          </div>

          <div
            style={{
              background: "rgba(239,68,68,0.25)",
              padding: "16px",
              borderRadius: "16px",
              margin: "20px 0",
              border: "1px dashed rgba(239,68,68,0.5)",
            }}
          >
            <p style={{ margin: 0, fontSize: "15px" }}>
              Only <strong>₹20 delivery charge</strong> otherwise
            </p>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <Link
              to="/menu"
              style={{
                padding: "20px",
                background: "white",
                color: "#1e3a8a",
                borderRadius: "50px",
                fontSize: "22px",
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
              🎅 View Menu & Order Now
            </Link>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "30px",
                marginTop: "10px",
                fontSize: "16px",
                opacity: 0.9,
              }}
            >
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Clock size={22} /> Lunch & Dinner
              </span>
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <IndianRupee size={22} /> Super Pocket-Friendly
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
              transform: translate(50px, -50px) rotate(180deg);
            }
            100% {
              transform: translate(0, 0) rotate(360deg);
            }
          }
          @keyframes pulse {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.03);
            }
          }
          @media (max-width: 480px) {
            h1 {
              fontsize: 46px !important;
            }
            h2,
            h3 {
              fontsize: 24px !important;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default Home;
