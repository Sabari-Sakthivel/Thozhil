import React from 'react';
import Registerimg from "../../assets/Login-img.png"

const Register = () => {
  return (
    
    <div className="min-h-screen flex">
      <div className="flex-1 bg-white p-10">
        <div className="max-w-sm mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-blue-600">JobHire</h1>
          </div>
          <h2 className="text-3xl font-semibold mb-4">Create account.</h2>
          <p className="mb-6 text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 underline">
              Log In
            </a>
          </p>
          
          {/* Form */}
          <form>
            <div className="space-y-4">
              
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-gray-600 text-sm">
                I've read and agree with your{' '}
                <a href="/terms" className="text-blue-600 underline">
                  Terms of Services
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Account
            </button>
          </form>
         
        </div>
      </div>
       {/* Right Section: Image */}
       <div className="w-full mr-10 md:w-1/2 h-screen">
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
