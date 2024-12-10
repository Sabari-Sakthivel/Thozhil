import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RazorpayPayment = () => {
  const location = useLocation();
  const { email, username } = location.state || {};
  console.log("Email:", email, "Username:", username);
  const [formData, setFormData] = useState({
    amount: "1060",
    username: username || "",  
    email: email || "",        
  });

  useEffect(() => {
    if (username && email) {
      setFormData((prevData) => ({
        ...prevData,
        username: username,
        email: email,
      }));
    }
  }, [username, email]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const navigate = useNavigate();

  const handlePayment = () => {
    if (!formData.amount || !formData.username || !formData.email) {
      alert("Please fill in all fields before proceeding!");
      return;
    }

    const options = {
      key: "rzp_test_rQNzx3WRnh97Sp",
      razorpay_payment_id: "6sBc16Kf21Jh8tZ3onmDSLxF",
      amount: parseInt(formData.amount) * 100, 
      currency: "INR",
      name: formData.username,  
      description: "Test Transaction",
      image: "https://example.com/your_logo", 
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        navigate("/login");
      },
      prefill: {
        name: formData.username,  
        email: formData.email,    
      },
      notes: {
        address: "Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Complete Your Payment
        </h2>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Secure payment powered by Razorpay
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              id="amount"
              type="number"
              readOnly
              value={formData.amount}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            onClick={handlePayment}
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RazorpayPayment;
