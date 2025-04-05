import asyncHandler from "../utils/asyncHandler.js";
import Claim from "../models/claim.model.js";
import FoundItem from "../models/items.models.js";
import ApiResponse from "../utils/ApiResponse.js";

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
