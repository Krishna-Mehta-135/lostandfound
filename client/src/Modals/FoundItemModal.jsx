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
import { toast } from "sonner"; // Optional, for feedback messages


export default function FoundItemDialog({ open, setOpen }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    category: "",
    questions: ["", "", ""],
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
    setStep(2);
  }

  async function handleSubmit(e) {
    e.preventDefault();
  
    const payload = {
      itemType: formData.itemName,
      description: formData.description,
      category: formData.category,
      finderName: "Ritesh Hooda", // replace later with user input or auth
      finderPhone: "9876543210",
      finderEmail: "ritesh@example.com",
      verificationQuestions: formData.questions.map((q) => ({ question: q })),
    };
  
    try {
      const res = await axios.post("http://localhost:5000/api/found", payload);
  
      if (res.status === 201) {
        toast.success("Item submitted successfully!");
  
        setFormData({
          itemName: "",
          description: "",
          category: "",
          questions: ["", "", ""],
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
            {step === 1
              ? "Fill in the basic details of the item you’ve found."
              : "Add follow-up questions to help verify ownership."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-4 mt-4">
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
                  {["brand", "stationary", "gadgetgit", "jewelry", "diet"].map((img, idx) => (
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
                Submit
              </Button>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}

