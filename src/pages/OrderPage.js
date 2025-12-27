// pages/OrderPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MapPin,
  CreditCard,
  CheckCircle,
  Truck,
  Gift,
  Loader2,
  ExternalLink,
} from "lucide-react";

const API_BASE_URL = "https://zombo.onrender.com";

const OrderPage = ({ clearCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount = 0, cartItems = [] } = location.state || {};

  const [address, setAddress] = useState("");
  const [locationLink, setLocationLink] = useState("");
  const [latLng, setLatLng] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  const deliveryCharge = totalAmount > 200 ? 0 : 0;
  const finalTotal = totalAmount + deliveryCharge - discount;

  // Launch date logic – Today is December 24, 2025 → Launch tomorrow (Dec 25)
  const launchDate = new Date("2025-12-25T00:00:00");
  const today = new Date();
  const isBeforeLaunch = today < launchDate;

  const daysUntilLaunch = Math.ceil(
    (launchDate - today) / (1000 * 60 * 60 * 24)
  );

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (code === "CHRISTMAS50") {
      setDiscount(totalAmount);
      alert("Coupon applied! 50% off");
    } else if (code === "FREEDELIVERY") {
      setDiscount(deliveryCharge);
      alert("Free delivery applied!");
    } else {
      alert("Invalid coupon code");
    }
    setCoupon("");
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setLocationLoading(true);
    setLocationError("");
    setLatLng("");
    setLocationLink("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const accuracy = position.coords.accuracy.toFixed(0);

        const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setLocationLink(mapsLink);

        setLatLng(
          `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(
            6
          )} (Accuracy: ~${accuracy}m)`
        );

        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );

          if (!response.ok) throw new Error("Failed to fetch address");

          const data = await response.json();

          let builtAddress = "";
          if (data.houseNumber) builtAddress += data.houseNumber + ", ";
          if (data.street) builtAddress += data.street + ", ";
          if (data.locality) builtAddress += data.locality + ", ";
          if (data.city) builtAddress += data.city + ", ";
          if (data.postcode) builtAddress += data.postcode + ", ";
          if (data.countryName) builtAddress += data.countryName;

          if (!builtAddress.trim()) {
            builtAddress = `${data.principalSubdivision || ""}, ${
              data.countryName || "Unknown location"
            }`;
          }

          // const fullAddress = builtAddress.trim().replace(/,+$/, "");
          setAddress(`${mapsLink}`);

          setLocationLoading(false);
        } catch (err) {
          setAddress(
            `📍 My Location: ${mapsLink}\n(You can add flat/house details above if needed)`
          );
          setLocationError(
            "Location detected, but full address not retrieved. Link added below."
          );
          setLocationLoading(false);
        }
      },
      (err) => {
        let msg = "Unable to retrieve your location.";
        if (err.code === err.PERMISSION_DENIED) {
          msg += " Please enable location access in your browser.";
        }
        setLocationError(msg);
        setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 600000 }
    );
  };

  const handlePlaceOrder = async () => {
    // This will never run because button is disabled before launch
    if (isBeforeLaunch) return;

    if (!address.trim()) {
      alert("Please enter or detect your delivery address");
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
          address: address.trim(),
          discountApplied: discount,
        }),
      });

      const json = await response.json();

      if (json.success) {
        setOrderPlaced(true);
        if (typeof clearCart === "function") clearCart();
        localStorage.removeItem("cart");
        localStorage.removeItem("cartItems");
        sessionStorage.removeItem("cart");

        setTimeout(() => navigate("/menu", { replace: true }), 3500);
      } else {
        setError(json.message || "Failed to place order.");
        setPlacingOrder(false);
      }
    } catch (err) {
      console.error("Order error:", err);
      setError("Network error. Please try again.");
      setPlacingOrder(false);
    }
  };

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
            Your delicious food is on the way!
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
            Redirecting to menu...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
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

            <button
              onClick={getCurrentLocation}
              disabled={locationLoading}
              style={{
                width: "100%",
                padding: "12px",
                background: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: locationLoading ? "not-allowed" : "pointer",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {locationLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Detecting Location...
                </>
              ) : (
                <>
                  <MapPin size={20} />
                  Use My Current Location
                </>
              )}
            </button>

            {latLng && (
              <div
                style={{
                  background: "#e0f2fe",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "12px",
                  fontSize: "14px",
                  color: "#0369a1",
                }}
              >
                <strong>Detected Coordinates:</strong>
                <br />
                {latLng}
              </div>
            )}

            {locationLink && (
              <div
                style={{
                  background: "#dcfce7",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "12px",
                  fontSize: "15px",
                }}
              >
                <strong>Precise Location Link Added Below:</strong>
                <br />
                <a
                  href={locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#16a34a",
                    textDecoration: "underline",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <ExternalLink size={18} />
                  Open in Google Maps
                </a>
              </div>
            )}

            {locationError && (
              <p
                style={{ color: "#ff6b6b", fontSize: "14px", margin: "10px 0" }}
              >
                {locationError}
              </p>
            )}

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Your address will auto-fill with location link when you tap the button above"
              style={addressInputStyle}
              rows="6"
            />
            <p style={{ fontSize: "13px", color: "#666", marginTop: "8px" }}>
              You can edit or add flat/house details. The location link will be
              saved with your order.
            </p>
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
                <span>-₹{discount.toFixed(0)}</span>
              </div>
            )}
            <div
              style={{ borderTop: "2px dashed #ddd", margin: "20px 0 15px" }}
            ></div>
            <div style={totalRowStyle}>
              <span style={{ fontSize: "20px" }}>To Pay</span>
              <span style={{ fontSize: "24px", color: "#667eea" }}>
                ₹{finalTotal.toFixed(0)}
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
            {/* <p style={{ fontSize: "13px", color: "#666", marginTop: "10px" }}>
              Try: <strong></strong> (50% off)
            </p> */}
          </div>

          <div style={footerStyle}>
            {/* Christmas Launch Message – Shown only before launch */}
            {isBeforeLaunch && (
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.25)",
                  border: "2px dashed #fbbf24",
                  borderRadius: "16px",
                  padding: "20px",
                  marginBottom: "20px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <h3 style={{ margin: "0 0 10px", fontSize: "22px" }}>
                  🎄 Merry Christmas Eve!
                </h3>
                <p
                  style={{
                    margin: "0 0 10px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  ZOMBO Officially Launches Tomorrow – 25th December!
                </p>
                <p style={{ margin: 0, opacity: 0.9 }}>
                  {daysUntilLaunch === 1
                    ? "Just 1 day left! Get ready for delicious ₹49 combos 🎅"
                    : `${daysUntilLaunch} days until we start delivering!`}
                </p>
              </div>
            )}

            {/* <button
              onClick={handlePlaceOrder}
              disabled={
                isBeforeLaunch ||
                placingOrder ||
                cartItems.length === 0 ||
                !address.trim()
              }
              style={placeOrderBtnStyle(
                isBeforeLaunch ||
                  placingOrder ||
                  cartItems.length === 0 ||
                  !address.trim()
              )}
            >
              {isBeforeLaunch ? (
                <>
                  <Gift size={24} />
                  See you Today – 27th Dec! at 10 am
                </>
              ) : placingOrder ? (
                "Placing Order..."
              ) : (
                <>
                  <CreditCard size={24} />

                  <>Place Order • ₹{finalTotal.toFixed(0)}</>

                 
                </>
              )}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles unchanged
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
  width: "90%",
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
// pages/OrderPage.jsx
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   MapPin,
//   CreditCard,
//   CheckCircle,
//   Truck,
//   Loader2,
//   ExternalLink,
//   Clock,
//   Sun,
//   Moon,
// } from "lucide-react";

// const API_BASE_URL = "https://zombo.onrender.com";

// const OrderPage = ({ clearCart }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { totalAmount = 0, cartItems = [] } = location.state || {};

//   const [address, setAddress] = useState("");
//   const [locationLink, setLocationLink] = useState("");
//   const [latLng, setLatLng] = useState("");
//   const [coupon, setCoupon] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [placingOrder, setPlacingOrder] = useState(false);
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [error, setError] = useState("");
//   const [locationLoading, setLocationLoading] = useState(false);
//   const [locationError, setLocationError] = useState("");

//   // Track current time for dinner ordering window (4 PM onwards)
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000); // Update every minute

//     return () => clearInterval(timer);
//   }, []);

//   const currentHour = currentTime.getHours(); // 0-23 format
//   const isOrderingOpen = currentHour >= 18; // 4 PM or later

//   const deliveryCharge = totalAmount > 200 ? 0 : 0;
//   const finalTotal = totalAmount + deliveryCharge - discount;

//   const applyCoupon = () => {
//     const code = coupon.trim().toUpperCase();
//     if (code === "FREEDELIVERY") {
//       setDiscount(deliveryCharge);
//       alert("Free delivery applied!");
//     } else {
//       alert("Invalid coupon code");
//     }
//     setCoupon("");
//   };

//   const getCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       setLocationError("Geolocation is not supported by your browser.");
//       return;
//     }

//     setLocationLoading(true);
//     setLocationError("");
//     setLatLng("");
//     setLocationLink("");

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         const accuracy = position.coords.accuracy.toFixed(0);

//         const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
//         setLocationLink(mapsLink);

//         setLatLng(
//           `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(
//             6
//           )} (Accuracy: ~${accuracy}m)`
//         );

//         try {
//           const response = await fetch(
//             `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
//           );

//           if (!response.ok) throw new Error("Failed to fetch address");

//           const data = await response.json();

//           let builtAddress = "";
//           if (data.houseNumber) builtAddress += data.houseNumber + ", ";
//           if (data.street) builtAddress += data.street + ", ";
//           if (data.locality) builtAddress += data.locality + ", ";
//           if (data.city) builtAddress += data.city + ", ";
//           if (data.postcode) builtAddress += data.postcode + ", ";
//           if (data.countryName) builtAddress += data.countryName;

//           if (!builtAddress.trim()) {
//             builtAddress = `${data.principalSubdivision || ""}, ${
//               data.countryName || "Unknown location"
//             }`;
//           }

//           const fullAddress = builtAddress.trim().replace(/,+$/, "");
//           setAddress(`${fullAddress}\n\n📍 Precise Location: ${mapsLink}`);

//           setLocationLoading(false);
//         } catch (err) {
//           setAddress(
//             `📍 My Location: ${mapsLink}\n(You can add flat/house details above if needed)`
//           );
//           setLocationError(
//             "Location detected, but full address not retrieved. Link added below."
//           );
//           setLocationLoading(false);
//         }
//       },
//       (err) => {
//         let msg = "Unable to retrieve your location.";
//         if (err.code === err.PERMISSION_DENIED) {
//           msg += " Please enable location access in your browser.";
//         }
//         setLocationError(msg);
//         setLocationLoading(false);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 600000 }
//     );
//   };

//   const handlePlaceOrder = async () => {
//     if (!isOrderingOpen) return;

//     if (!address.trim()) {
//       alert("Please enter or detect your delivery address");
//       return;
//     }

//     if (cartItems.length === 0) {
//       alert("Your cart is empty");
//       return;
//     }

//     setPlacingOrder(true);
//     setError("");

//     const token = localStorage.getItem("zombo_token");
//     if (!token) {
//       alert("Please login to place order");
//       navigate("/login");
//       return;
//     }

//     try {
//       const orderItems = cartItems.map((item) => ({
//         menuItem: item._id,
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity,
//       }));

//       const response = await fetch(`${API_BASE_URL}/api/orders`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           items: orderItems,
//           totalAmount: finalTotal,
//           address: address.trim(),
//           discountApplied: discount,
//         }),
//       });

//       const json = await response.json();

//       if (json.success) {
//         setOrderPlaced(true);
//         if (typeof clearCart === "function") clearCart();
//         localStorage.removeItem("cart");
//         localStorage.removeItem("cartItems");
//         sessionStorage.removeItem("cart");

//         setTimeout(() => navigate("/menu", { replace: true }), 3500);
//       } else {
//         setError(json.message || "Failed to place order.");
//         setPlacingOrder(false);
//       }
//     } catch (err) {
//       console.error("Order error:", err);
//       setError("Network error. Please try again.");
//       setPlacingOrder(false);
//     }
//   };

//   const isPlaceOrderDisabled =
//     !isOrderingOpen ||
//     placingOrder ||
//     cartItems.length === 0 ||
//     !address.trim();

//   if (orderPlaced) {
//     return (
//       <div style={successScreenStyle}>
//         <div style={successCardStyle}>
//           <CheckCircle size={100} color="#4ade80" strokeWidth={3} />
//           <h1
//             style={{ fontSize: "36px", margin: "30px 0", fontWeight: "bold" }}
//           >
//             Order Placed Successfully!
//           </h1>
//           <p style={{ fontSize: "20px", opacity: 0.9, marginBottom: "30px" }}>
//             Your delicious food is on the way!
//           </p>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "12px",
//               fontSize: "18px",
//             }}
//           >
//             <Truck size={28} />
//             <span>Estimated delivery: 30-45 minutes</span>
//           </div>
//           <p style={{ marginTop: "30px", fontSize: "16px", opacity: 0.8 }}>
//             Redirecting to menu...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={pageStyle}>
//       <div style={{ maxWidth: "600px", margin: "0 auto" }}>
//         <h1 style={titleStyle}>Complete Your Order</h1>

//         {error && (
//           <div
//             style={{
//               color: "#ff6b6b",
//               textAlign: "center",
//               margin: "20px 0",
//               fontSize: "16px",
//               fontWeight: "bold",
//             }}
//           >
//             {error}
//           </div>
//         )}

//         <div style={mainCardStyle}>
//           {/* Order Summary */}
//           <div style={{ padding: "25px" }}>
//             <h2
//               style={{
//                 margin: "0 0 20px",
//                 fontSize: "24px",
//                 fontWeight: "bold",
//                 color: "#333",
//               }}
//             >
//               Your Order ({cartItems.length}{" "}
//               {cartItems.length === 1 ? "item" : "items"})
//             </h2>
//             {cartItems.map((item) => (
//               <div key={item._id} style={itemRowStyle}>
//                 <div>
//                   <span style={{ fontWeight: "bold" }}>{item.name}</span>
//                   <span style={{ color: "#666", marginLeft: "10px" }}>
//                     × {item.quantity}
//                   </span>
//                 </div>
//                 <span style={{ fontWeight: "bold" }}>
//                   ₹{item.price * item.quantity}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Delivery Address */}
//           <div style={{ padding: "25px", background: "#f8f9fa" }}>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "10px",
//                 marginBottom: "15px",
//               }}
//             >
//               <MapPin size={24} color="#667eea" />
//               <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
//                 Delivery Address
//               </h3>
//             </div>

//             <button
//               onClick={getCurrentLocation}
//               disabled={locationLoading}
//               style={{
//                 width: "100%",
//                 padding: "12px",
//                 background: "#667eea",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "12px",
//                 fontSize: "16px",
//                 fontWeight: "bold",
//                 cursor: locationLoading ? "not-allowed" : "pointer",
//                 marginBottom: "12px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: "8px",
//               }}
//             >
//               {locationLoading ? (
//                 <>
//                   <Loader2 size={20} className="animate-spin" />
//                   Detecting Location...
//                 </>
//               ) : (
//                 <>
//                   <MapPin size={20} />
//                   Use My Current Location
//                 </>
//               )}
//             </button>

//             {latLng && (
//               <div
//                 style={{
//                   background: "#e0f2fe",
//                   padding: "10px",
//                   borderRadius: "8px",
//                   marginBottom: "12px",
//                   fontSize: "14px",
//                   color: "#0369a1",
//                 }}
//               >
//                 <strong>Detected Coordinates:</strong>
//                 <br />
//                 {latLng}
//               </div>
//             )}

//             {locationLink && (
//               <div
//                 style={{
//                   background: "#dcfce7",
//                   padding: "12px",
//                   borderRadius: "8px",
//                   marginBottom: "12px",
//                   fontSize: "15px",
//                 }}
//               >
//                 <strong>Precise Location Link Added:</strong>
//                 <br />
//                 <a
//                   href={locationLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{
//                     color: "#16a34a",
//                     textDecoration: "underline",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "6px",
//                   }}
//                 >
//                   <ExternalLink size={18} />
//                   Open in Google Maps
//                 </a>
//               </div>
//             )}

//             {locationError && (
//               <p
//                 style={{ color: "#ff6b6b", fontSize: "14px", margin: "10px 0" }}
//               >
//                 {locationError}
//               </p>
//             )}

//             <textarea
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               placeholder="Your address will auto-fill with location link when you tap the button above"
//               style={addressInputStyle}
//               rows="6"
//             />
//             <p style={{ fontSize: "13px", color: "#666", marginTop: "8px" }}>
//               You can edit or add flat/house details. The location link will be
//               saved with your order.
//             </p>
//           </div>

//           {/* Price Breakdown */}
//           <div style={{ padding: "25px" }}>
//             <h3
//               style={{
//                 margin: "0 0 15px",
//                 fontSize: "20px",
//                 fontWeight: "bold",
//               }}
//             >
//               Price Details
//             </h3>
//             <div style={priceRowStyle}>
//               <span>Items Total</span>
//               <span>₹{totalAmount}</span>
//             </div>
//             <div style={priceRowStyle}>
//               <span>Delivery Charge</span>
//               <span
//                 style={{ color: deliveryCharge === 0 ? "#4ade80" : "#333" }}
//               >
//                 {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
//               </span>
//             </div>
//             {discount > 0 && (
//               <div
//                 style={{
//                   ...priceRowStyle,
//                   color: "#4ade80",
//                   fontWeight: "bold",
//                 }}
//               >
//                 <span>Discount Applied</span>
//                 <span>-₹{discount.toFixed(0)}</span>
//               </div>
//             )}
//             <div
//               style={{ borderTop: "2px dashed #ddd", margin: "20px 0 15px" }}
//             ></div>
//             <div style={totalRowStyle}>
//               <span style={{ fontSize: "20px" }}>To Pay</span>
//               <span style={{ fontSize: "24px", color: "#667eea" }}>
//                 ₹{finalTotal.toFixed(0)}
//               </span>
//             </div>
//           </div>

//           {/* Coupon Section */}
//           <div style={{ padding: "0 25px 25px" }}>
//             <div style={{ display: "flex", gap: "10px" }}>
//               <input
//                 type="text"
//                 value={coupon}
//                 onChange={(e) => setCoupon(e.target.value)}
//                 placeholder="Enter coupon code"
//                 style={couponInputStyle}
//                 disabled={discount > 0}
//               />
//               <button
//                 onClick={applyCoupon}
//                 style={applyBtnStyle}
//                 disabled={discount > 0}
//               >
//                 {discount > 0 ? "Applied" : "Apply"}
//               </button>
//             </div>
//             <p style={{ fontSize: "13px", color: "#666", marginTop: "10px" }}>
//               {/* Try: <strong>CHRISTMAS50</strong> (50% off) */}
//             </p>
//           </div>

//           {/* Footer with Time-Based Message */}
//           <div style={footerStyle}>
//             {/* Message when ordering is closed (before 4 PM) */}
//             {!isOrderingOpen && (
//               <div
//                 style={{
//                   background: "rgba(251, 191, 36, 0.25)",
//                   border: "2px dashed #f59e0b",
//                   borderRadius: "16px",
//                   padding: "24px",
//                   marginBottom: "20px",
//                   textAlign: "center",
//                   color: "white",
//                 }}
//               >
//                 <div style={{ marginBottom: "12px" }}>
//                   <Sun size={48} color="#fbbf24" />
//                   <Moon
//                     size={32}
//                     color="#6366f1"
//                     style={{ marginLeft: "-16px" }}
//                   />
//                 </div>
//                 <h3 style={{ margin: "0 0 12px", fontSize: "24px" }}>
//                   🌙 Dinner Orders Start at 6:30 PM!
//                 </h3>
//                 <p
//                   style={{
//                     margin: "0 0 10px",
//                     fontSize: "18px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   <Clock
//                     size={24}
//                     style={{ verticalAlign: "-4px", marginRight: "8px" }}
//                   />
//                   Current time:{" "}
//                   {currentTime.toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </p>
//                 <p style={{ margin: 0, opacity: 0.95, fontSize: "16px" }}>
//                   We're prepping the kitchen for your delicious evening feast!
//                   🍛✨
//                   <br />
//                   Come back after 6.30 PM to place your dinner order.
//                 </p>
//               </div>
//             )}

//             {/* Encouraging message when ordering is open */}
//             {isOrderingOpen &&
//               !isPlaceOrderDisabled &&
//               address.trim() &&
//               cartItems.length > 0 && (
//                 <div
//                   style={{
//                     background: "rgba(74, 222, 128, 0.2)",
//                     borderRadius: "12px",
//                     padding: "16px",
//                     marginBottom: "20px",
//                     textAlign: "center",
//                     color: "white",
//                     fontSize: "18px",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   🍴 Kitchen is HOT & Ready! Place your dinner order now!
//                 </div>
//               )}

//             <button
//               onClick={handlePlaceOrder}
//               disabled={isPlaceOrderDisabled}
//               style={placeOrderBtnStyle(isPlaceOrderDisabled)}
//             >
//               {!isOrderingOpen ? (
//                 <>
//                   <Clock size={24} />
//                   Orders Open at 6:30 PM
//                 </>
//               ) : placingOrder ? (
//                 "Placing Order..."
//               ) : (
//                 <>
//                   <CreditCard size={24} />
//                   Place Order • ₹{finalTotal.toFixed(0)}
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Styles (unchanged from original)
// const pageStyle = {
//   minHeight: "100vh",
//   background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//   padding: "100px 20px 140px",
// };
// const titleStyle = {
//   textAlign: "center",
//   fontSize: "36px",
//   color: "white",
//   marginBottom: "30px",
//   fontWeight: "bold",
// };
// const mainCardStyle = {
//   background: "rgba(255,255,255,0.97)",
//   borderRadius: "24px",
//   overflow: "hidden",
//   boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
// };
// const itemRowStyle = {
//   display: "flex",
//   justifyContent: "space-between",
//   padding: "14px 0",
//   borderBottom: "1px solid #eee",
// };
// const addressInputStyle = {
//   width: "90%",
//   padding: "15px",
//   borderRadius: "12px",
//   border: "2px solid #ddd",
//   fontSize: "16px",
//   resize: "vertical",
//   fontFamily: "inherit",
// };
// const priceRowStyle = {
//   display: "flex",
//   justifyContent: "space-between",
//   marginBottom: "12px",
//   fontSize: "16px",
// };
// const totalRowStyle = {
//   display: "flex",
//   justifyContent: "space-between",
//   fontSize: "22px",
//   fontWeight: "bold",
// };
// const couponInputStyle = {
//   flex: 1,
//   padding: "14px",
//   borderRadius: "12px",
//   border: "2px solid #ddd",
//   fontSize: "16px",
// };
// const applyBtnStyle = {
//   padding: "0 24px",
//   background: "#667eea",
//   color: "white",
//   border: "none",
//   borderRadius: "12px",
//   fontWeight: "bold",
//   cursor: "pointer",
// };
// const footerStyle = {
//   padding: "30px 25px",
//   background: "linear-gradient(135deg, #667eea, #764ba2)",
// };
// const placeOrderBtnStyle = (disabled) => ({
//   width: "100%",
//   padding: "18px",
//   background: "white",
//   color: "#667eea",
//   border: "none",
//   borderRadius: "50px",
//   fontSize: "20px",
//   fontWeight: "bold",
//   cursor: disabled ? "not-allowed" : "pointer",
//   opacity: disabled ? 0.6 : 1,
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   gap: "12px",
//   boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
// });
// const successScreenStyle = {
//   minHeight: "100vh",
//   background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   padding: "40px",
//   textAlign: "center",
//   color: "white",
// };
// const successCardStyle = {
//   background: "rgba(255,255,255,0.15)",
//   padding: "60px 40px",
//   borderRadius: "30px",
//   backdropFilter: "blur(15px)",
//   maxWidth: "500px",
//   width: "100%",
// };

// export default OrderPage;
