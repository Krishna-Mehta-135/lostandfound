import React, { useState } from "react";
import FoundItemDialog from "@/Modals/FoundItemModal";

const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  function Searchhandler(e) {
    e.preventDefault();
    console.log(search);
    setSearch("");
  }

  return (
    <>
      <div className="h-[50vh] w-full bg-[#1E293B] flex flex-col justify-center items-center px-4 relative text-center space-y-6 sm:space-y-8">
        {/* Search Box */}
        <form onSubmit={Searchhandler} className="w-full flex justify-center">
          <div className="w-full max-w-[90%] sm:max-w-lg md:max-w-xl flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your lost item here..."
              className="flex-grow px-4 py-3 sm:py-4 rounded-full bg-white text-black text-base sm:text-lg shadow-lg border-gray-300 focus:ring-2 focus:ring-[#F97316] focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 sm:px-6 py-3 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 transition flex items-center justify-center"
            >
              <img src="/search.svg" className="w-6 h-6 sm:w-8 sm:h-8" alt="Search" />
            </button>
          </div>
        </form>

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
    </>
  );
};

export default Homepage;
