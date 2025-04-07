import FoundItem from "../models/items.models.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import moment from "moment";
import NotificationRequest from "../models/notificationRequest.models.js";
import {sendEmail} from "../utils/sendEmail.js";

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
            createdBy: req.user._id,
        });

        // 🔔 Notify users who requested notification for this category
        const matchingUsers = await NotificationRequest.find({category, notified: false});

        for (const user of matchingUsers) {
            await sendEmail({
                to: user.email,
                subject: `A new ${itemType} was reported found!`,
                text: `Hello!\n\nA new ${category} item was just added on the Lost & Found portal.\nGo check it out to see if it might be yours.`,
                html: `
                    <div style="font-family: sans-serif;">
                        <h2>A new <span style="color: #6366F1;">${itemType}</span> was reported found!</h2>
                        <p>Category: <strong>${category}</strong></p>
                        <p>Go check the Lost & Found portal to see if it's yours.</p>
                        <p style="margin-top: 1rem;">Regards,<br>Lost & Found Team</p>
                    </div>
                `,
            });

            user.notified = true;
            await user.save();
        }

        return res.status(201).json(new ApiResponse(201, newItem, "Found item created successfully"));
    } catch (error) {
        console.error("Error creating found item:", error.message);
        return res.status(500).json(new ApiResponse(500, null, "Failed to create found item"));
    }
});

// ✅ Get a single found item by ID
const getFoundItemById = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const item = await FoundItem.findById(id);
    if (!item) {
        return res.status(404).json(new ApiResponse(404, null, "Item not found"));
    }

    return res.status(200).json(new ApiResponse(200, item, "Item fetched successfully"));
});

// ✅ Get all items created by the current user
const getMyFoundItems = asyncHandler(async (req, res) => {
    const myItems = await FoundItem.find({createdBy: req.user._id}).sort({createdAt: -1});

    res.status(200).json(new ApiResponse(200, myItems, "Your found items fetched successfully"));
});

export {getAllFoundItems, createFoundItem, getFoundItemById, getMyFoundItems};
