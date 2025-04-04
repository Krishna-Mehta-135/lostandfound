import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1E293B] text-white py-4 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">© {new Date().getFullYear()} Lost & Found. All rights reserved.</p>
        <div className="mt-2">
          <a href="#about" className="mx-3 hover:text-orange-500">About Us</a>
          <a href="#contact" className="mx-3 hover:text-orange-500">Contact</a>
          <a href="#privacy" className="mx-3 hover:text-orange-500">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
