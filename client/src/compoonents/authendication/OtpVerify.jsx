import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OtpVerification() {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const { email, username, role, companyName } = location.state || {}; // Get role and companyName from state

  console.log("Location State:", location.state);

  // Handle OTP input changes
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus the next input box automatically
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  // Submit OTP for verification
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.join("").length !== 4) {
      setError("Please enter a valid 4-digit OTP.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/user/verify-otp",
        {
          otp: otp.join(""),
          email,
          username,
          role,
          companyName,
        }
      );

      console.log("API Response:", response);

      if (response.data.success) {
        setSuccessMessage("OTP verified successfully.");
        setError("");
        setTimeout(() => {
          console.log("Navigating to the appropriate page based on role");
          
          if (role === "employer") {
            navigate("/login", { state: { email, companyName } });
          } else {
            navigate("/payment", { state: { email, username } });
          }
        }, 1000);
      } else {
        setError(response.data.message || "Invalid OTP. Please try again.");
        setSuccessMessage("");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);

      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }

      setSuccessMessage("");
    }
  };

  // Resend OTP
  const handleOnResendOtp = async () => {
    if (!email) {
      setError("Email is required to resend OTP.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/user/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          role: role,
          companyName: companyName,
        }), // Pass role and companyName if employer
      });
      const data = await response.json();

      if (data.success) {
        alert("OTP was sent again to your email.");
      } else {
        alert("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error while resending the OTP:", error);
      alert("An error occurred while resending OTP. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 bg-blue-100 p-5">
      <h2 className="text-lg font-semibold text-blue-500 mb-5">
        OTP Verification
      </h2>
      {email && (
        <p className="text-sm mb-4 text-blue-600">
          Check your email ({email}) for the OTP.
        </p>
      )}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {successMessage && (
        <div className="text-green-500 mb-4">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex space-x-3 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              className="shadow appearance-none border rounded w-12 h-12 text-center text-blue-600 text-xl leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>

        {/* Resend OTP Button */}
        <button
          type="button"
          onClick={handleOnResendOtp}
          className="block text-blue-600 text-sm text-right font-bold mb-3 hover:text-blue-800"
        >
          Resend OTP
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
}

export default OtpVerification;
