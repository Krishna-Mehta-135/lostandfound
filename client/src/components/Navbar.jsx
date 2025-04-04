import { BellIcon } from "lucide-react";
import React, { useState } from "react";

const Navbar = () => {
  const [notification, setNotification] = useState(0);
  const [message, setMessage] = useState(""); // New

  const handleNotification = () => {
    setNotification((prev) => prev + 1);
    setMessage("🎉 An item matching your lost one is found!");
    setTimeout(() => setMessage(""), 3000); // Clear after 3 sec
  };

  return (
    <nav className="bg-[#1E293B] text-white p-2 flex justify-between">
      <h1 className="text-xl font-bold">Lost & Found</h1>

      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <div className="relative">
          <button onClick={handleNotification}>
            <BellIcon size={24} />
            {notification > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1 rounded-full">
                {notification}
              </span>
            )}
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className="absolute top-14 right-4 bg-white text-black px-4 py-2 rounded shadow">
            {message}
          </div>
        )}

        {/* Login Button */}
        <button className="bg-orange-500 px-4 py-2 rounded-lg text-black hover:bg-orange-600 tracking-wide">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
