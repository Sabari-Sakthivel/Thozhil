import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Loginimg from "../../assets/Login-img.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              to="/authendication/Register"
              className="text-blue-600 underline"
            >
              Create Account
            </Link>
          </p>

          <form>
            <div className="space-y-4">
              {/* Email Input */}
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
                  placeholder="Enter your email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password Input */}
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
              <label className="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-gray-300 focus:ring-blue-500"
                />
                Remember Me
              </label>
              <Link className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full mt-6 py-3 flex items-center justify-center bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
              <FaArrowRightLong className="ml-2" />
            </button>
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
