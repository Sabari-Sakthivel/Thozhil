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
    companyName: "",
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Validate field dynamically
    validateField(name, value);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const validateField = (name, value) => {
    let errorMessage = "";
  
    // Skip validation for username if the role is 'employer'
    if (name === "username" && formData.role === "employer") {
      console.log("Skipping username validation for employer");
      return ""; // Skip validation and return no error
    }
  
    // Skip empty check for the termsAccepted checkbox and handle other fields
    if ((typeof value === "string" && !value.trim()) || value === undefined || value === null) {
      if (name !== "termsAccepted") {
        errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
      }
    } else {
      switch (name) {
        case "username":
          if (!value.trim()) {
            errorMessage = "Username is required.";
          } else if (!/^[a-zA-Z\s]+$/.test(value)) {
            errorMessage = "Username should only contain letters and spaces.";
          }
          break;
  
        case "companyName":
          if (formData.role === "candidate") {
            // Skip company name validation if the role is candidate
            return ""; // No error for candidate
          }
          if (!value.trim()) {
            errorMessage = "Company Name is required for employers.";
          }
          break;
  
        case "email":
          if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
            errorMessage = "Invalid email format.";
          }
          break;
  
        case "phone":
          if (!/^[6-9]\d{9}$/.test(value)) {
            errorMessage = "Phone number must be a valid 10-digit Indian number starting with 6-9.";
          }
          break;
  
        case "password":
          if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}/.test(value)) {
            errorMessage = "Password must be at least 8 characters long, with 1 uppercase letter, 1 number, and 1 special character.";
          }
          break;
  
        case "confirmPassword":
          if (value !== formData.password) {
            errorMessage = "Passwords do not match.";
          }
          break;
  
        case "termsAccepted":
          if (!formData.termsAccepted) {
            errorMessage = "You must accept the terms and conditions.";
          }
          break;
  
        default:
          break;
      }
    }
  
    return errorMessage;
  };
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Form Data before validation:", formData);
  
    const fieldNames = Object.keys(formData);
    let newErrors = {};
  
    console.log("Validating fields...");
  
    // Determine which fields to validate based on role
    const skipUsernameValidation = formData.role === "employer";
    const skipCompanyNameValidation = formData.role === "candidate";
  
    // Validate all fields and accumulate errors
    fieldNames.forEach((field) => {
      // Skip validation for specific fields based on role
      if (field === "username" && skipUsernameValidation) {
        console.log("Skipping validation for username");
        return; // Skip username validation for employer
      }
      if (field === "companyName" && skipCompanyNameValidation) {
        console.log("Skipping validation for companyName");
        return; // Skip companyName validation for candidate
      }
  
      // Run field validation and accumulate errors
      const errorMessage = validateField(field, formData[field]);
  
      // Only add errors if there's a validation message
      if (errorMessage) {
        newErrors[field] = errorMessage;
      }
    });
  
    // Validate the termsAccepted checkbox
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions.";
    }
  
    // Set errors to state
    setErrors(newErrors);
  
    console.log("Errors after validation:", newErrors);
  
    // Check if all fields are valid, ignoring skipped fields
    const formIsValid = Object.keys(newErrors).length === 0 && Object.entries(formData).every(([key, value]) => {
      // Ignore skipped fields for validation
      if ((key === "username" && skipUsernameValidation) || (key === "companyName" && skipCompanyNameValidation)) {
        return true; // Treat skipped fields as valid
      }
      return value !== "" && value !== undefined; // Ensure other fields are non-empty
    });
  
    console.log("Form validity status:", formIsValid);
  
    // If there are errors or any required fields are empty, stop the submission
    if (!formIsValid) {
      console.log("Form is not valid:", newErrors);
      return;
    }
  
    console.log("Form is valid. Submitting...");
  
    // Proceed with form submission
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
  
        const navigateState = formData.role === "employer"
          ? {  email: formData.email,role:formData.role }
          : { username: formData.username, email: formData.email, role:formData.role };
  
        navigate("/otpverify", { state: navigateState });
      } else {
        console.error("Registration failed:", result);
        alert(result.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  
  
  

  const renderCandidateForm = () => (
    <>
      {formData.role === "candidate" && (
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
      )}
    </>
  );

  const renderEmployerForm = () => (
    <>
      {formData.role === "employer" && (
        <div className="flex flex-col">
          <label
            htmlFor="companyName"
            className="text-base font-semibold text-gray-600 mb-1"
          >
            Company Name:
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company Name"
            className={`w-full p-2 border ${
              errors.companyName ? "border-red-500" : "border-gray-300"
            } rounded-lg`}
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
          )}
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 bg-white px-6 py-4 md:px-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-blue-600 mb-2 text-center">
            JobHire
          </h1>
          <h2 className="text-3xl font-semibold text-center mb-4">
            Create Account
          </h2>
          <p className="mb-4 text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Log in
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="candidate">Candidate</option>
                <option value="employer">Employer</option>
              </select>
            </div>

            {formData.role === "candidate" && renderCandidateForm()}
            {formData.role === "employer" && renderEmployerForm()}

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
                placeholder="Email"
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
                placeholder="Phone Number"
                maxLength={10}
                className={`w-full p-2 border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="flex flex-col">
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
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="text-gray-500" />
                  ) : (
                    <AiOutlineEye className="text-gray-500" />
                  )}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex flex-col">
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
                <span
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible className="text-gray-500" />
                  ) : (
                    <AiOutlineEye className="text-gray-500" />
                  )}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="termsAccepted" className="text-sm text-gray-600">
                I accept the{" "}
                <Link to="/terms" className="text-blue-500">
                  Terms and Conditions
                </Link>
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="text-red-500 text-sm mt-1">
                {errors.termsAccepted}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <div className="w-full h-full md:h-auto mr-5 md:w-1/2">
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
