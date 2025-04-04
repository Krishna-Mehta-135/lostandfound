import React, { useState } from 'react';
import FoundItemModal from '../others/FoundItemModal';

const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search,setSearch] = useState("");
  function Searchhandler(e){
    e.preventDefault();
    console.log(search);
    setSearch("");
  }

  return (
    <>
      <div className="h-[50vh] w-full bg-[#1E293B] flex items-center justify-center relative px-4">
        
        {/* Search Box & Icon Button */}
        <form className="" onSubmit={(e)=>{
          Searchhandler(e);
        }}>
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl flex space-x-2">
          <input
            type="text"
            value={search}
            onChange={(e) =>{
              setSearch(e.target.value)
            }}
            placeholder="Search your lost item here..."
            className="w-100 px-6 py-4 rounded-full bg-white text-black text-lg shadow-lg border-gray-300 focus:ring-2 focus:ring-[#F97316] focus:outline-none"
          />
          <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full shadow-md hover:bg-orange-600 transition">
            <img src="/search.svg" className="w-10 h-9" alt="Search" />
          </button>
        </div>
       </form>
        {/* Bottom Centered Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-xs sm:max-w-sm md:max-w-md bg-[#F97316] hover:bg-[#EA580C] text-black py-3 rounded-md text-center"
        >
          Found an item? Tell us here...
        </button>
      </div>

      {/* Popup Modal */}
      <FoundItemModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
};

export default Homepage;


