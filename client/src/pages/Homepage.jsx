import React, { useState } from "react";
import axios from "axios";
import FoundItemDialog from "@/Modals/FoundItemModal";
import Gridview from "@/components/Gridview";

const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [notificationLoading, setNotificationLoading] = useState(false);

  const categories = ["Jewelry", "Clothes", "Electronics", "Stationary", "Bottles&Tiffin"];

  const handleNotifyMe = async () => {
    if (!selectedCategory) {
      alert("Please select a category!");
      return;
    }

    try {
      setNotificationLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:9898/api/v1/notifications/subscribe",
        { category: selectedCategory },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message || "Notification request submitted!");
      setSelectedCategory("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong.");
    } finally {
      setNotificationLoading(false);
    }
  };

  return (
    <>
      <div className="h-[50vh] w-full bg-[#1E293B] flex flex-col justify-center items-center px-4 relative text-center space-y-6 sm:space-y-8">
        {/* Search Box */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[90%] sm:max-w-lg md:max-w-xl flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your lost item here..."
              className="flex-grow px-4 py-3 sm:py-4 rounded-full bg-white text-black text-base sm:text-lg shadow-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setSearch("")}
              className="px-4 sm:px-6 py-3 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 transition flex items-center justify-center"
            >
              <img src="/search.svg" className="w-6 h-6 sm:w-8 sm:h-8" alt="Clear" />
            </button>
          </div>
        </div>

        {/* Notification Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-md bg-white border border-gray-300 text-black text-sm sm:text-base shadow focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select category to get notified</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button
            onClick={handleNotifyMe}
            disabled={notificationLoading}
            className={`relative px-6 py-2 rounded-md font-semibold text-sm shadow transition duration-300 ease-in-out
              ${
                notificationLoading
                  ? "bg-orange-300 cursor-not-allowed text-white"
                  : "bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white hover:scale-105"
              }`}
          >
            {notificationLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Notify Me"
            )}
          </button>
        </div>

        {/* Found Item Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 transform sm:w-[60%] md:w-[40%] bg-[#F97316] hover:bg-[#EA580C] text-black py-3 rounded-md font-semibold text-sm sm:text-base"
        >
          Found an item? Tell us here...
        </button>
      </div>

      {/* Modal */}
      <FoundItemDialog open={isModalOpen} setOpen={setIsModalOpen} />

      {/* Grid View with Search */}
      <Gridview search={search} />
    </>
  );
};

export default Homepage;
