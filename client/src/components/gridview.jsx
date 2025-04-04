import React from 'react';

const items = [
  {
    title: 'jewelery',
    description: 'Brown leather wallet found near cafeteria.',
    image: 'jewelry.png',
  },
  {
    title: 'copy',
    description: 'Blue Milton bottle left in Room 104.',
    image: 'stationary.png',
  },
  {
    title: 'earphone',
    description: 'Maths notes found in the library.',
    image: 'responsive.png',
  },
  {
    title: 'water bottle',
    description: 'Student ID card picked up near parking.',
    image: 'diet.png',
  },
  {
    title: 'Wallet',
    description: 'Black fast charger found in lab.',
    image: 'brand.png',
  },
  {
    title: 'jewelery',
    description: 'Brown leather wallet found near cafeteria.',
    image: 'jewelry.png',
  },
  {
    title: 'copy',
    description: 'Blue Milton bottle left in Room 104.',
    image: 'stationary.png',
  },
  {
    title: 'earphone',
    description: 'Maths notes found in the library.',
    image: 'responsive.png',
  },
  {
    title: 'water bottle',
    description: 'Student ID card picked up near parking.',
    image: 'diet.png',
  },
  {
    title: 'Wallet',
    description: 'Black fast charger found in lab.',
    image: 'brand.png',
  },
];

const Gridview = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#284B63]">Lost Items</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[60vh]  overflow-y-auto  no-scrollbar ">
        {items.map((item, index) => ( 
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            {/* Icon-like image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-cover rounded-sm mb-4 border-2 border-[#284B63]"
            />

            <h3 className="text-xl font-semibold text-[#284B63]">{item.title}</h3>
            <p className="mt-2 text-gray-700">{item.description}</p>
            <button className=" bg-amber-600 text-white rounded-sm border-black hover:bg-yellow-200 p-1">View detials</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gridview;
