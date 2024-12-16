import axios from "axios";
import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Loginimg from "../../assets/Login-img.png";
import { useAuth } from "../../UserPages/contextApi/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required.";
    if (!emailRegex.test(email)) return "Please enter a valid email address.";
    return "";
  };

  // Validate Password for Strength
  const validatePassword = (password) => {
    const lengthCriteria = /.{8,}/; // At least 8 characters
    const upperCaseCriteria = /[A-Z]/; // At least one uppercase letter
    const lowerCaseCriteria = /[a-z]/; // At least one lowercase letter
    const numberCriteria = /[0-9]/; // At least one number
    const specialCharacterCriteria = /[!@#$%^&*(),.?":{}|<>]/; // At least one special character

    if (!password) return "Password is required.";
    if (!lengthCriteria.test(password))
      return "Password must be at least 8 characters.";
    if (!upperCaseCriteria.test(password))
      return "Password must include at least one uppercase letter.";
    if (!lowerCaseCriteria.test(password))
      return "Password must include at least one lowercase letter.";
    if (!numberCriteria.test(password))
      return "Password must include at least one number.";
    if (!specialCharacterCriteria.test(password))
      return "Password must include at least one special character.";

    return ""; // No errors
  };
  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate Inputs
    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/user/login", {
        email,
        password,
      });

      if (response.data && response.data.token && response.data.user) {
        const { token, user } = response.data;

        // Store token and user data
        const storageMethod = rememberMe ? localStorage : sessionStorage;
        storageMethod.setItem("token", token);
        storageMethod.setItem("user", JSON.stringify(user));

        // Set token in AuthContext
        login(token);

        alert(`Login successful as ${user.role}!`);

        // Navigate based on user role
        switch (user.role) {
          case "candidate":
            navigate("/candidatelayout");
            break;
          case "employer":
            navigate("/EmployerDashboard");
            break;
          case "admin":
            navigate("/admin/dashboard");
            break;
          default:
            navigate("/dashboard"); // Default route
        }
      } else {
        const errorMessage = response.data?.message || "Invalid credentials.";
        setError(errorMessage);
        alert(errorMessage);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="flex-1 bg-white p-10">
        <div className="max-w-sm mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-blue-600">JobHire</h1>
          </div>
          <h2 className="text-3xl font-semibold mb-4">Login</h2>
          <p className="mb-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/authentication/register"
              className="text-blue-600 underline"
            >
              Create Account
            </Link>
          </p>

          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(validateEmail(e.target.value));
                  }}
                  value={email}
                  
                  placeholder="Enter your email"
                  className={`mt-1 block w-full px-4 py-2 border ${
                    emailError ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    emailError ? "focus:ring-red-500" : "focus:ring-blue-500"
                  }`}
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(validatePassword(e.target.value));
                  }}
                  placeholder="Enter your password"
                  className={`mt-1 block w-full px-4 py-2 border ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    passwordError ? "focus:ring-red-500" : "focus:ring-blue-500"
                  } pr-10`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex mt-6 items-center text-gray-500 hover:text-blue-500 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="h-5 w-5" />
                  ) : (
                    <AiOutlineEye className="h-5 w-5" />
                  )}
                </button>
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <label className="inline-flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <span className="ml-2">Remember Me</span>
              </label>
              <Link
                to="/authentication/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 py-3 flex items-center justify-center ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {loading ? "Logging in..." : "Login"}
              {!loading && <FaArrowRightLong className="ml-2" />}
            </button>
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </form>
        </div>
      </div>

      <div className="w-full mr-10 md:w-1/2 h-screen">
        <img
          src={Loginimg}
          alt="Login Illustration"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
