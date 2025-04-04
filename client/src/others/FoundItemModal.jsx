import React, { useState } from 'react';

const FoundItemModal = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;
  const [text,setTExt] = useState('');
  function handleSearch(e){
    e.preventDefault();
    console.log
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Found Item Details</h2>

        {/* Form Fields */}
        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Item Name</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter item name"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter item description"
              rows={3}
            ></textarea>
          </div>

          {/* Categories (can be clickable images later) */}
          <div>
            <label className="block font-medium mb-1">Select Category</label>
            <div className="grid grid-cols-3 gap-2">
              <button type="button" className="border p-2 rounded hover:bg-orange-100">< img src="brand.png" className='w-16 h-16 mx-auto object-contain'></img></button>
              <button type="button" className="border p-2 rounded hover:bg-orange-100">< img src="stationary.png" className='w-16 h-16 mx-auto object-contain'></img></button>
              <button type="button" className="border p-2 rounded hover:bg-orange-100">< img src="responsive.png" className='w-16 h-16 mx-auto object-contain'></img></button>
              <button type="button" className="border p-2 rounded hover:bg-orange-100">< img src="jewelry.png" className='w-16 h-16 mx-auto object-contain'></img></button>
              <button type="button" className="border p-2 rounded hover:bg-orange-100">< img src="diet.png" className='w-16 h-16 mx-auto object-contain'></img></button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FoundItemModal;
