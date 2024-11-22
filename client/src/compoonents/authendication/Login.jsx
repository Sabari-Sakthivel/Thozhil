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
    <div className="min-h-screen flex flex-col bg-white md:flex-row">
      
      <div className="text-4xl mt-14 pl-20 text-blue-500 font-bold">
        <h1>JobHire</h1>
      </div>

      <div className="w-full md:w-1/2 mt-14 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Login
          </h2>

          <p className="text-sm font-medium text-gray-700 text-center">
            Don't Have an Account?{" "}
            <Link
              to="/authendication/Register"
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Create Account
            </Link>
          </p>

          <form className="space-y-6">
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

            {/* Password Input with Toggle */}
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

            <div className="flex justify-between items-center">
              <label className="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-gray-300 focus:ring-blue-500"
                />
                Remember Me
              </label>
              <Link className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 flex items-center justify-center bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Login
              <FaArrowRightLong className="ml-2" />
            </button>
          </form>
        </div>
      </div>

      {/* Right Section: Image */}
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
