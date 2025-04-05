import React from 'react';
import ViewDetailsModal from '../others/ViewDetailsModal'; // import the modal component

const items = [
  {
    title: 'jewelery',
    description: 'Brown leather wallet found near cafeteria.',
    image: 'jewelry.png',
    email: 'example@mail.com',
    questions: ['Where did you lose it?', 'Describe the design.']
  },
  {
    title: 'copy',
    description: 'Blue Milton bottle left in Room 104.',
    image: 'stationary.png',
    email: 'example@mail.com',
    questions: ['What’s written on it?', 'Any subject tags?']
  },
  {
    title: 'earphone',
    description: 'Maths notes found in the library.',
    image: 'gadget.png',
    email: 'example@mail.com',
    questions: ['What’s the first topic?', 'Page count?']
  },
  {
    title: 'water bottle',
    description: 'Student ID card picked up near parking.',
    image: 'diet.png',
    email: 'example@mail.com',
    questions: ['Name on the ID?', 'Department?']
  },
  {
    title: 'Wallet',
    description: 'Black fast charger found in lab.',
    image: 'brand.png',
    email: 'example@mail.com',
    questions: ['Charger brand?', 'Any marks/stickers?']
  },
  // Add more objects as needed...
];

const Gridview = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-[70vh]">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#284B63]">Lost Items</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto no-scrollbar">
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

            <div className="mt-4">
              <ViewDetailsModal item={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gridview;
