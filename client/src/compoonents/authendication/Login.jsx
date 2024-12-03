import axios from "axios";
import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Loginimg from "../../assets/Login-img.png";
import { useAuth } from "../../pages/contextApi/AuthContext"; // Import AuthContext

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login } = useAuth(); // Destructure the login function from context
  const navigate = useNavigate();

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Set loading state to true

    // Validate Inputs
    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/user/login", {
        email,
        password,
      });

      if (response.data.token) {
        alert("Login successful!");
        localStorage.setItem("username",response.data.user)
        
        navigate("/layout");

        // Store the token in localStorage
        const storageMethod = rememberMe ? localStorage : sessionStorage;
        storageMethod.setItem("token", response.data.token); // Save token

        // Update the isAuthenticated state in AuthContext
        login(response.data.token);
      } else {
        setError(response.data || "Invalid credentials.");
        alert(response.data.message)
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false); // Reset loading state
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
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Enter your email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
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
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex justify-between items-center mt-4">
              <Link
                to="/authendication/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
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

      {/* Right Side */}
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
