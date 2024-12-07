import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 pr-0 py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1  md:grid-cols-5 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">JobHire</h2>
          <p >Call now: <span className="text-gray-100">+91 987647893</span></p>
          <p className="mt-2">6391 ,shenoy nagar,<br />chennai,Tamil Nadu <br />India ,600030</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Link</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>

        {/* Candidate Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Candidate</h3>
          <ul className="space-y-2">
            <li><Link to="/browse-jobs" className="hover:text-white">Browse Jobs</Link></li>
            <li><Link to="/browse-employers" className="hover:text-white">Browse Employers</Link></li>
            <li><Link to="/candidate-dashboard" className="hover:text-white">Candidate Dashboard</Link></li>
            <li><Link to="/saved-jobs" className="hover:text-white">Saved Jobs</Link></li>
          </ul>
        </div>
        {/* Employers Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Employers</h3>
          <ul className="space-y-2">
            <li><Link to="/browse-jobs" className="hover:text-white">Post Jobs</Link></li>
            <li><Link to="/browse-employers" className="hover:text-white">Browse Candidates</Link></li>
            <li><Link to="/candidate-dashboard" className="hover:text-white">Employer Dashboard</Link></li>
            <li><Link to="/saved-jobs" className="hover:text-white">Applications</Link></li>
          </ul>
        </div>
        {/* Support Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/faqs" className="hover:text-white">FAQs</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms-conditions" className="hover:text-white">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-5 border-t relative  border-gray-700  flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm absolute top-2 ml-[520px] ">© 2024 JobHire - Job Portal. All rights Reserved</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link to="#" className="hover:text-white"><i className="fab fa-facebook-f"></i></Link>
          <Link to="#" className="hover:text-white"><i className="fab fa-youtube"></i></Link>
          <Link to="#" className="hover:text-white"><i className="fab fa-instagram"></i></Link>
          <Link to="#" className="hover:text-white"><i className="fab fa-twitter"></i></Link>
        </div>  
      </div>
    </footer>
  );
};

export default Footer;
