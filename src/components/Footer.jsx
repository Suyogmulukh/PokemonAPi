import React from "react";

const Footer = () => {
  return (
    <footer className="w-full mt-4 sm:mt-6 bg-gray-900 text-gray-300">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 text-center sm:text-left">
        
        {/* Left Side */}
        <p className="text-sm sm:text-base">
          © {new Date().getFullYear()} Pokemon Explorer. All rights reserved.
        </p>

        {/* Right Side */}
        <p className="text-sm sm:text-lg font-medium font-serif">
          Created by <span className="text-yellow-600 font-semibold">SUYOG</span>
        </p>

      </div>
    </footer>
  );
};

export default Footer;
