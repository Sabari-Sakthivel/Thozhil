import Registerimg from "../../assets/Login-img.png";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "candidate",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    validateField(name, value);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const validateField = (name, value) => {
    let errorMessage = "";

    // Check if the field is empty first
    if (!value.trim()) {
      errorMessage = `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } is required.`;
    } else {
      // Perform specific validation checks based on field name
      switch (name) {
        case "username":
          if (!/^[a-zA-Z\s]+$/.test(value)) {
            errorMessage = "Username should only contain letters and spaces.";
          }
          break;
        case "email":
          if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
            errorMessage = "Invalid email format.";
          }
          break;
        case "phone":
          if (!/^[6-9]\d{9}$/.test(value)) {
            errorMessage =
              "Phone number must be a valid 10-digit Indian number.";
          }
          break;
        case "password":
          if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}/.test(value)) {
            errorMessage =
              "Password must be at least 8 characters long, with 1 uppercase letter, 1 number, and 1 special character.";
          }
          break;
        case "confirmPassword":
          if (value !== formData.password) {
            errorMessage = "Passwords do not match.";
          }
          break;
        case "role":
          if (!value) {
            errorMessage = "Role is required.";
          }
          break;
        default:
          break;
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trigger validation for all fields when the user submits the form
    const fieldNames = Object.keys(formData);
    let newErrors = {};

    // Validate each field and check if there are errors
    fieldNames.forEach((field) => {
      validateField(field, formData[field]);
      if (errors[field]) {
        newErrors[field] = errors[field];
      }
    });

    // Update the errors state to show all error messages
    setErrors(newErrors);

    // Check if there are any errors or empty fields
    const formIsValid =
      Object.keys(newErrors).length === 0 &&
      Object.values(formData).every((value) => value !== "");

    if (!formIsValid) {
      return; // Prevent form submission if there are errors
    }

    // If validation passes, proceed with the registration process
    try {
      const response = await fetch("http://localhost:4000/user/usercreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Registration successful:", result);
        navigate("/otpverify", {
          state: { email: formData.email, username: formData.username },
        });
      } else {
        console.error("Registration failed:", result);
        alert(result.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 bg-white px-6 py-4 md:px-10">
        <div className="max-w-md mx-auto">
          <div className="mb-2 text-center md:text-left">
            <h1 className="text-2xl font-bold text-blue-600">JobHire</h1>
          </div>
          <h2 className="text-3xl font-semibold text-center md:text-left mb-2">
            Create Account
          </h2>
          <p className="mb-3 text-gray-600 text-center md:text-left">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline">
              Log In
            </Link>
          </p>
          <form onSubmit={handleSubmit}>
            <div>
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
                  className={`w-full p-2 border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>

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
                  className={`w-full p-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

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
                  className={`w-full p-2 border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="role"
                  className="text-base font-semibold text-gray-600 mb-1"
                >
                  Role:
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.role ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                >
                  <option value="candidate">Candidate</option>
                  <option value="employer">Employer</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm">{errors.role}</p>
                )}
              </div>

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
                    className={`w-full p-2 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-lg`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-500 focus:outline-none"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="h-5 w-5" />
                    ) : (
                      <AiOutlineEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

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
                    className={`w-full p-2 border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-500 focus:outline-none"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible className="h-5 w-5" />
                    ) : (
                      <AiOutlineEye className="h-5 w-5" />
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
            <div className="mt-4">
              <label className="inline-flex items-center text-sm text-gray-600">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">
                  I agree to the terms and conditions
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="w-96 mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center gap-2"
            >
              Create Account
              <FaArrowRightLong className="ml-2" />
            </button>
          </form>
        </div>
      </div>
      <div className="w-full h-48 md:h-auto mr-5 md:w-1/2">
        <img
          src={Registerimg}
          alt="Login Illustration"
          className="w-full  object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
