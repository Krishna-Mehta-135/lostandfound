import FoundItem from "../models/items.models.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import moment from "moment";

// ✅ Get all unclaimed found items
const getAllFoundItems = asyncHandler(async (req, res) => {
    try {
        const items = await FoundItem.find({isClaimed: false}, "itemType _id createdAt category").sort({
            createdAt: -1,
        });

        const formattedItems = items.map((item) => ({
            id: item._id,
            itemType: item.itemType,
            createdAt: moment(item.createdAt).fromNow(),
            generalPhoto: `/${item.category.toLowerCase()}.png`,
        }));

        return res.status(200).json(new ApiResponse(200, formattedItems, "Found items fetched"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, "Failed to fetch found items"));
    }
});

// ✅ Create a new found item
const createFoundItem = asyncHandler(async (req, res) => {
    try {
        const {itemType, description, category, finderName, finderPhone, finderEmail, verificationQuestions} = req.body;

        if (
            !itemType ||
            !description ||
            !category ||
            !finderName ||
            !finderPhone ||
            !finderEmail ||
            !Array.isArray(verificationQuestions) ||
            verificationQuestions.length < 3 ||
            verificationQuestions.length > 5
        ) {
            return res
            .status(400)
            .json(
                new ApiResponse(400, null, "All fields are required and 3 to 5 verification questions must be provided")
            );
        }

        const formattedQuestions = verificationQuestions.map((q) => ({question: q}));

        const newItem = await FoundItem.create({
            itemType,
            description,
            category,
            finderName,
            finderPhone,
            finderEmail,
            verificationQuestions: formattedQuestions,
        });

        return res.status(201).json(new ApiResponse(201, newItem, "Found item created successfully"));
    } catch (error) {
        console.error("Error creating found item:", error.message);
        return res.status(500).json(new ApiResponse(500, null, "Failed to create found item"));
    }
});

export{
    getAllFoundItems,
    createFoundItem
}