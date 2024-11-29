import Registerimg from "../../assets/Login-img.png";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Register = () => {
  // State for form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate =useNavigate

  const handleRegister = async (e) => {
  e.preventDefault(); // Prevent form's default submission behavior

  // Validate form fields
  if (!validate()) {
    return; // Stop if validation fails
  }

  try {
    const response = await fetch("http://localhost:4000/user/usercreate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Navigate to OTP verify page if registration is successful
      navigate("/otpverify");
    } else {
      const result = await response.json();
      alert(result.error || "Registration failed. Please try again.");
    }
  } catch (error) {
    console.error("Registration error:", error);
    alert("An error occurred. Please try again.");
  }
};


  // State for password visibility and errors
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Form validation
  const validate = () => {
    let errors = {};

    // Name validation (letters and spaces only)
    if (!formData.username) {
      errors.username = "Username is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.username)) {
      errors.username = "Username should contain only letters and spaces.";
    }

    // Email validation (valid email format)
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      errors.email = "Please enter a valid email address.";
    }

    // Phone validation (Indian phone number format)
    if (!formData.phone) {
      errors.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid 10-digit Indian phone number.";
    }

    // Password validation (at least 8 characters, 1 uppercase, 1 number, 1 special char)
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (
      !/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}/.test(formData.password)
    ) {
      errors.password =
        "Password must be at least 8 characters long, with 1 uppercase letter, 1 number, and 1 special character.";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm password is required.";
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!validate()) {
      return; // Stop if validation fails
    }

    // Send data to backend
    const response = await fetch("http://localhost:4000/user/usercreate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      // Success handling (e.g., redirect to login)
      console.log("Registration successful:", result);
      // Redirect to login page
      window.location.href = "/otpverify";
    } else {
      // Error handling
      console.error("Registration failed:", result);
      alert(result.error || "Registration failed. Please try again.");
    }
  };

  const handlePaste = (e) => {
    e.preventDefault(); // Prevent the default paste action
    alert("Pasting is disabled in this field.");
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="flex-1 bg-white px-6 py-4 md:px-10">
        <div className="max-w-md mx-auto">
          {/* Branding */}
          <div className="mb-2 text-center md:text-left">
            <h1 className="text-2xl font-bold text-blue-600">JobHire</h1>
          </div>
          {/* Form Heading */}
          <h2 className="text-3xl font-semibold text-center md:text-left mb-2">
            Create Account
          </h2>
          <p className="mb-3 text-gray-600 text-center md:text-left">
            Already have an account?{" "}
            <Link
              to="/authendication/Login"
              className="text-blue-600 underline"
            >
              Log In
            </Link>
          </p>
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="">
              {/* Username */}
              <div className="flex flex-col">
                <label
                  htmlFor="username"
                  className="text-base font-semibold text-gray-600 mb-1"
                >
                  Username:
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  maxLength={20}
                  placeholder="Username"
                  className="w-96 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-base font-semibold text-gray-600 mb-1"
                >
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-96 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label
                  htmlFor="phone"
                  className="text-base font-semibold text-gray-600 mb-1"
                >
                  Phone Number:
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength="10"
                  placeholder="Phone Number"
                  className="w-96 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col relative">
                <label
                  htmlFor="password"
                  className="text-base font-semibold text-gray-600 mb-1"
                >
                  Password:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-96 max-w-md select-none p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-500 focus:outline-none"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="h-5 w-5 absolute right-16" />
                    ) : (
                      <AiOutlineEye className="h-5 w-5 absolute right-16" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col relative">
                <label
                  htmlFor="confirmPassword"
                  className="text-base font-semibold text-gray-600 mb-1"
                >
                  Confirm Password:
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    onPaste={handlePaste}
                    className="w-96 max-w-md p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-500 focus:outline-none"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible className="h-5 w-5 absolute right-16" />
                    ) : (
                      <AiOutlineEye className="h-5 w-5 absolute right-16" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
            {/* Terms and Conditions */}
            <div className="mt-4">
              <label className="inline-flex items-center text-sm text-gray-600">
                <input type="checkbox" className="form-checkbox" required />
                <span className="ml-2">
                  I agree to the terms and conditions
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onSubmit={handleRegister}
              className="w-96 mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center gap-2"
            >
              Create Account
              <FaArrowRightLong className="ml-2" />
            </button>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full h-48 md:h-auto mr-5 md:w-1/2">
        <img
          src={Registerimg}
          alt="Login Illustration"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
