import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ViewDetailsDialog = ({ item }) => {

  const IItem = item?.item ?? item;
  const itemId = IItem?._id || IItem?.id;

  console.log("Actual item ID to fetch:", itemId);

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [fetchedItem, setFetchedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [claimantName, setClaimantName] = useState("");
  const [claimantEmail, setClaimantEmail] = useState("");

  const fetchItem = async () => {
    if (!itemId) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:9898/api/v1/foundItems/${itemId}`);
      console.log("Fetched item from API:", res.data);
      setFetchedItem(res.data.data);
      setAnswers(new Array(res.data.data.verificationQuestions.length).fill(""));
    } catch (err) {
      console.error("Error fetching item:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogOpen = async () => {
    setStep(1);
    setFetchedItem(null);
    await fetchItem();
    setOpen(true);
  };

  const handleAnswerChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSubmit = async () => {
    try {
      const formattedAnswers = fetchedItem.verificationQuestions.map((q, i) => ({
        question: q.question,
        answer: answers[i],
      }));

      await axios.post("http://localhost:9898/api/claims/submit", {
        itemId,
        claimantName,
        claimantEmail,
        answers: formattedAnswers,
      });

      alert("Claim submitted successfully!");
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to submit claim.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-orange-500 text-white"
          onClick={handleDialogOpen}
        >
          View Details
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Item Details</DialogTitle>
        </DialogHeader>

        {loading ? (
          <p className="text-center">Loading item details...</p>
        ) : !fetchedItem ? (
          <p className="text-center text-red-500">No item data found.</p>
        ) : step === 1 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{fetchedItem.itemType}</h2>
            <p className="text-gray-600">{fetchedItem.description}</p>

            {fetchedItem.verificationQuestions.map((q, i) => (
              <div key={i}>
                <Label>{q.question}</Label>
                <Input
                  value={answers[i] || ""}
                  onChange={(e) => handleAnswerChange(i, e.target.value)}
                  placeholder="Enter your answer"
                />
              </div>
            ))}

            <DialogFooter>
              <Button onClick={handleNext} className="w-full mt-4">
                Next
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <div className="space-y-3">
              <div>
                <Label>Your Name</Label>
                <Input value={claimantName} onChange={(e) => setClaimantName(e.target.value)} />
              </div>
              <div>
                <Label>Your Email</Label>
                <Input value={claimantEmail} onChange={(e) => setClaimantEmail(e.target.value)} />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleSubmit}>Submit Claim</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetailsDialog;
