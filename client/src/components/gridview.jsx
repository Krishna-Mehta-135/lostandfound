import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ViewDetailsModal from '../Modals/ViewDetailsModal';

const Gridview = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data from backend when component mounts
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:9898/api/v1/foundItems");
        setItems(res.data.data); // FIXED
      } catch (err) {
        console.error("Failed to fetch items:", err);
      }
    };
    ;

    fetchItems();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-[70vh]">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#284B63]">Lost Items</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto no-scrollbar">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            <img
              src={`/${getImageByCategory(item.category)}`} // Dynamically set image based on category
              alt={item.itemType}
              className="w-16 h-16 object-cover rounded-sm mb-4 border-2 border-[#284B63]"
            />

            <h3 className="text-xl font-semibold text-[#284B63]">{item.itemType}</h3>
            <p className="mt-2 text-gray-700">{item.description}</p>

            <div className="mt-4">
              <ViewDetailsModal item={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper to choose image by category
function getImageByCategory(category) {
  const map = {
    Jewelry: "jewelry.png",
    Stationary: "stationary.png",
    Electronics: "gadget.png",
    Clothes: "brand.png",
    "Bottles&Tiffin": "diet.png",
  };
  return map[category] || "default.png";
}

export default Gridview;
