import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
    {
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FoundItem",
            required: true,
        },
        claimantName: {
            //  should be 'claimantName'
            type: String,
            required: true,
        },
        claimantEmail: {
            //  should be 'claimantEmail'
            type: String,
            required: true,
        },
        answers: [
            {
                question: String,
                answer: String,
            },
        ],
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    {timestamps: true}
);

const ItemClaim = mongoose.model("ItemClaim", claimSchema);
export default ItemClaim;
