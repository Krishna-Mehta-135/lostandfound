import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function ViewDetailsModal({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const [answers, setAnswers] = useState(["", "", ""]);

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", answers);
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-orange-500 hover:underline"
      >
        View Details
      </button>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all space-y-4">
                  
                  {/* Image */}
                  <div className="w-full flex justify-center">
                    <img
                      src={item?.image || "/placeholder.jpg"}
                      alt={item?.name}
                      className="w-40 h-40 object-cover rounded-xl shadow-md"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="text-center text-xl font-semibold text-gray-900">
                    {item?.name || "Item Name"}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-700 text-center">{item?.description}</p>

                  {/* Questions & Inputs */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Questions (for claim):</h4>
                    {item?.questions?.length > 0 ? (
                      item.questions.slice(0, 3).map((q, index) => (
                        <div key={index} className="space-y-1">
                          <p className="text-sm text-gray-700">{q}</p>
                          <input
                            type="text"
                            value={answers[index]}
                            onChange={(e) => handleChange(index, e.target.value)}
                            placeholder="Your answer..."
                            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                          />
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No questions provided.</p>
                    )}
                  </div>

                  {/* Contact */}
                  <div className="text-sm text-gray-600 text-center">
                    <strong>Contact:</strong> {item?.email || "example@mail.com"}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 pt-4">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md text-sm hover:bg-gray-400"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600"
                    >
                      Submit Answers
                    </button>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

