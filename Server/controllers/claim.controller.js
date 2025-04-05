import asyncHandler from "../utils/asyncHandler.js";
import Claim from "../models/claim.model.js";
import FoundItem from "../models/items.models.js";
import ApiResponse from "../utils/ApiResponse.js";
import sendEmail from "../utils/sendEmail.js";

// Create a claim for an item
export const createClaim = asyncHandler(async (req, res) => {
    const {itemId, claimantName, claimantEmail, answers} = req.body;

    if (!itemId || !claimantName || !claimantEmail || !answers || answers.length === 0) {
        return res.status(400).json(new ApiResponse(400, null, "All fields are required"));
    }

    const item = await FoundItem.findById(itemId);
    if (!item) {
        return res.status(404).json(new ApiResponse(404, null, "Item not found"));
    }

    const claim = await Claim.create({
        itemId,
        claimantName,
        claimantEmail,
        answers,
    });

    return res.status(201).json(new ApiResponse(201, claim, "Claim submitted successfully"));
});

export const getClaimsForItem = asyncHandler(async (req, res) => {
    const { itemId } = req.params;

    const item = await FoundItem.findById(itemId);
    if (!item) {
        return res.status(404).json(new ApiResponse(404, null, "Item not found"));
    }

    const claims = await Claim.find({ itemId });

    return res.status(200).json(new ApiResponse(200, claims, "Claims for this item fetched successfully"));
});

export const approveClaim = asyncHandler(async (req, res) => {
    const { claimId } = req.params;

    const claim = await Claim.findById(claimId);
    if (!claim) {
        return res.status(404).json(new ApiResponse(404, null, "Claim not found"));
    }

    const item = await FoundItem.findById(claim.itemId);
    if (!item) {
        return res.status(404).json(new ApiResponse(404, null, "Item not found"));
    }

    // Send finder's contact details to claimant
    await sendEmail(
        claim.claimantEmail,
        "Claim Approved - Lost & Found",
        `Your claim was approved! Contact the finder:\nName: ${item.finderName}\nEmail: ${item.finderEmail}\nPhone: ${item.finderPhone}`
    );

    claim.status = "approved";
    await claim.save();

    return res.status(200).json(new ApiResponse(200, null, "Claim approved and contact info sent"));
});

export const rejectClaim = asyncHandler(async (req, res) => {
    const { claimId } = req.params;

    const claim = await Claim.findById(claimId);
    if (!claim) {
        return res.status(404).json(new ApiResponse(404, null, "Claim not found"));
    }

    await sendEmail(
        claim.claimantEmail,
        "Claim Rejected - Lost & Found",
        `Sorry, your claim for the item was rejected. The finder didn't find your answers convincing.`
    );

    claim.status = "rejected";
    await claim.save();

    return res.status(200).json(new ApiResponse(200, null, "Claim rejected and mail sent"));
});
