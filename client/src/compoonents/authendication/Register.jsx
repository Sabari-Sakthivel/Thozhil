import Registerimg from "../../assets/Login-img.png";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="flex-1 bg-white px-6 py-4 md:px-10">
        <div className="max-w-md mx-auto">
          {/* Branding */}
          <div className="mb-4 text-center md:text-left">
            <h1 className="text-2xl font-bold text-blue-600">JobHire</h1>
          </div>
          {/* Form Heading */}
          <h2 className="text-3xl font-semibold text-center md:text-left mb-2">
            Create Account
          </h2>
          <p className="mb-6 text-gray-600 text-center md:text-left">
            Already have an account?{" "}
            <Link
              to="/authendication/Login"
              className="text-blue-600 underline"
            >
              Log In
            </Link>
          </p>
          {/* Form */}
          <form>
            <div className="space-y-4">
              {/* Username */}
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Email Address */}
              <input
                type="email"
                placeholder="Email address"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Phone Number */}
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
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
              {/* Confirm Password Input */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
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
            </div>
            {/* Terms and Conditions */}
            <div className="flex items-center mt-4">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-gray-600 text-sm">
                I've read and agree with your{" "}
                <a href="/terms" className="text-blue-600 underline">
                  Terms of Services
                </a>
              </label>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center gap-2"
            >
              Create Account
              <FaArrowRightLong className="ml-2" />
            </button>
          </form>
        </div>
      </div>
      {/* Right Section */}
      <div className="w-full h-48 md:h-auto mr-10 md:w-1/2">
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
