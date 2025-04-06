import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function FoundItemDialog({ open, setOpen }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    category: "",
    questions: ["", "", ""],
    finderName: "",
    finderPhone: "",
    finderEmail: "",
  });

  function handleBasicInfoChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleQuestionChange(index, value) {
    const updated = [...formData.questions];
    updated[index] = value;
    setFormData({ ...formData, questions: updated });
  }

  function handleNext(e) {
    e.preventDefault();
    setStep((prev) => prev + 1);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      itemType: formData.itemName,
      description: formData.description,
      category: formData.category,
      finderName: formData.finderName,
      finderPhone: formData.finderPhone,
      finderEmail: formData.finderEmail,
      verificationQuestions: formData.questions,
    };

    try {
      const res = await axios.post("http://localhost:9898/api/v1/foundItems/create", payload);

      if (res.status === 201) {
        toast.success("Item submitted successfully!");
        setFormData({
          itemName: "",
          description: "",
          category: "",
          questions: ["", "", ""],
          finderName: "",
          finderPhone: "",
          finderEmail: "",
        });
        setStep(1);
        setOpen(false);
      }
    } catch (error) {
      console.error("Error submitting item:", error);
      toast.error(error?.response?.data?.message || "Failed to submit item");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">Found Item Details</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {step === 1 && "Fill in the basic details of the item you’ve found."}
            {step === 2 && "Add follow-up questions to help verify ownership."}
            {step === 3 && "Provide your contact details in case someone needs to reach you."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={step === 3 ? handleSubmit : handleNext} className="space-y-4 mt-4">
          {step === 1 && (
            <>
              <div>
                <label className="block font-medium mb-1">Item Name</label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleBasicInfoChange}
                  className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter item name"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleBasicInfoChange}
                  className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter item description"
                  rows={3}
                  required
                ></textarea>
              </div>

              <div>
                <label className="block font-medium mb-1">Select Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Clothes", "Stationary", "Electronics", "Jewelry", "Bottles&Tiffin"].map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: img })}
                      className={`border p-2 rounded ${formData.category === img ? "bg-orange-100 border-orange-500" : ""}`}
                    >
                      <img src={`/${img}.png`} alt={img} className="w-16 h-16 mx-auto object-contain" />
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                Next
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              {[0, 1, 2].map((i) => (
                <div key={i}>
                  <label className="block font-medium mb-1">{`Question ${i + 1}`}</label>
                  <input
                    type="text"
                    value={formData.questions[i]}
                    onChange={(e) => handleQuestionChange(i, e.target.value)}
                    className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder={`Enter question ${i + 1}`}
                    required
                  />
                </div>
              ))}

              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                Next
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="block font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  name="finderName"
                  value={formData.finderName}
                  onChange={handleBasicInfoChange}
                  className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="finderPhone"
                  value={formData.finderPhone}
                  onChange={handleBasicInfoChange}
                  className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="finderEmail"
                  value={formData.finderEmail}
                  onChange={handleBasicInfoChange}
                  className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                Submit
              </Button>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
