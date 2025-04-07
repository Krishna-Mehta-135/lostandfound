import React, { useEffect, useState } from "react";
import axios from "axios";
import ViewDetailsDialog from "../Modals/ViewDetailsModal";

const Gridview = ({ search = "" }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:9898/api/v1/foundItems", {
          headers: {
            Authorization: `Bearer ${token}`, // 👈 pass JWT here
          },
        });

        setItems(res.data.data);
      } catch (err) {
        console.error("❌ Failed to fetch items:", err);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter((item) => {
    const itemType = item.itemType?.toLowerCase() || "";
    const description = item.description?.toLowerCase() || "";
    const searchText = search.trim().toLowerCase();

    return (
      itemType.startsWith(searchText) || description.startsWith(searchText)
    );
  });

  return (
    <div className="p-6 bg-gray-100 min-h-[70vh]">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#284B63]">
        Lost Items
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto no-scrollbar">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <img
                src={item.generalPhoto}
                alt={item.itemType}
                className="w-16 h-16 object-cover rounded-sm mb-4 border-2 border-[#284B63]"
              />

              <h3 className="text-xl font-semibold text-[#284B63]">
                {item.itemType}
              </h3>
              <p className="mt-2 text-gray-700">{item.description}</p>

              <div className="mt-4">
                <ViewDetailsDialog item={item} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No matching items found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Gridview;
