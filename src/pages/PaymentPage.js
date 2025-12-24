// pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, ArrowRight, CheckCircle } from "lucide-react";

const RegisterPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle sending OTP
  const handleSendOtp = () => {
    if (phoneNumber.length === 10 && /^\d+$/.test(phoneNumber)) {
      setLoading(true);
      setTimeout(() => {
        setOtpSent(true);
        setLoading(false);
      }, 2000);
    } else {
      alert("Please enter a valid 10-digit phone number");
    }
  };

  // Handle OTP input
  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === "1234") {
      setLoading(true);
      setTimeout(() => {
        navigate("/view-cart", {
          state: { name: phoneNumber, page: "RegisterPage" },
        });
      }, 1500);
    } else {
      alert("Invalid OTP. Try 1234");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(15px)",
          borderRadius: "24px",
          padding: "40px 30px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.2)",
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: "30px" }}>
          <div
            style={{
              width: 80,
              height: 80,
              background: "linear-gradient(135deg, #ff8c42, #ff6b35)",
              borderRadius: "50%",
              margin: "0 auto 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Phone size={40} color="white" />
          </div>
          <h1
            style={{
              fontSize: "28px",
              color: "white",
              margin: "0 0 8px",
              fontWeight: "bold",
            }}
          >
            {otpSent ? "Enter OTP" : "Welcome!"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", margin: 0 }}>
            {otpSent
              ? `We sent a code to +91 ${phoneNumber}`
              : "Login or signup with your phone number"}
          </p>
        </div>

        {!otpSent ? (
          <>
            {/* Phone Input */}
            <div
              style={{
                position: "relative",
                marginBottom: "25px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "16px 0 0 16px",
                  padding: "0 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                <span style={{ fontSize: "20px" }}>India Flag</span> +91
              </div>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                placeholder="Enter phone number"
                maxLength="10"
                style={{
                  width: "100%",
                  padding: "18px 18px 18px 120px",
                  fontSize: "18px",
                  borderRadius: "16px",
                  border: "none",
                  outline: "none",
                  background: "rgba(255,255,255,0.25)",
                  color: "white",
                  backdropFilter: "blur(10px)",
                }}
                onKeyPress={(e) => e.key === "Enter" && handleSendOtp()}
              />
            </div>

            <button
              onClick={handleSendOtp}
              disabled={loading || phoneNumber.length !== 10}
              style={{
                width: "100%",
                padding: "18px",
                background: loading ? "rgba(255,255,255,0.3)" : "white",
                color: "#667eea",
                border: "none",
                borderRadius: "16px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              {loading ? "Sending OTP..." : "Continue"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </>
        ) : (
          <>
            {/* OTP Inputs */}
            <div style={{ margin: "30px 0" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                }}
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    maxLength="1"
                    style={{
                      width: "60px",
                      height: "60px",
                      textAlign: "center",
                      fontSize: "24px",
                      fontWeight: "bold",
                      borderRadius: "16px",
                      border: "none",
                      background: "rgba(255,255,255,0.25)",
                      color: "white",
                      outline: digit ? "3px solid #fff" : "none",
                      transition: "all 0.3s",
                    }}
                    onFocus={(e) =>
                      (e.target.style.outline = "3px solid white")
                    }
                    onBlur={(e) =>
                      (e.target.style.outline = digit
                        ? "3px solid white"
                        : "none")
                    }
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={loading || otp.join("").length !== 4}
              style={{
                width: "100%",
                padding: "18px",
                background: loading ? "rgba(255,255,255,0.3)" : "white",
                color: "#667eea",
                border: "none",
                borderRadius: "16px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              {loading ? (
                "Verifying..."
              ) : (
                <>
                  Verify & Continue
                  <CheckCircle size={22} />
                </>
              )}
            </button>

            <p
              style={{
                marginTop: "20px",
                color: "rgba(255,255,255,0.8)",
                fontSize: "14px",
              }}
            >
              Didn't receive OTP?{" "}
              <span
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => setOtpSent(false)}
              >
                Resend
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
