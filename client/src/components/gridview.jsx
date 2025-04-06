import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ViewDetailsModal from '../Modals/ViewDetailsModal';

const Gridview = () => {
  const [items, setItems] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // ✅ access env variable

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/found`);
        setItems(res.data);
      } catch (err) {
        console.error("Failed to fetch items:", err);
      }
    };

    fetchItems();
  }, [backendUrl]);

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
              src={`/${getImageByCategory(item.category)}`}
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

function getImageByCategory(category) {
  const map = {
    Jewelry: "jewelry.png",
    Stationary: "stationary.png",
    Electronics: "electronics.png",
    Clothes: "clothes.png",
    "Bottles&Tiffin": "bottles&tiffin.png",
  };
  return map[category] || "default.png";
}

export default Gridview;
