import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoundItem",
      required: true,
    },
    claimerEmail: {
      type: String,
      required: true,
    },
    claimerName: {
      type: String,
      required: true,
    },
    answers: [
      {
        question: String,
        answer: String,
      },
    ],
    isApproved: {
      type: Boolean,
      default: null, // null = pending, true = approved, false = rejected
    },
  },
  { timestamps: true }
);

const ItemClaim = mongoose.model("ItemClaim", claimSchema);
export default ItemClaim;
