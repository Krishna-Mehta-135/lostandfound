import FoundItem from "../models/items.models.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import moment from "moment";

export const getAllFoundItems = asyncHandler(async (req, res) => {
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
});

const createFoundItem = asyncHandler(async (req, res) => {
    const newItem = await FoundItem.create({
        itemType,
        description,
        category,
        questions,
        finderEmail,
    });
});

const verifyAnswers = asyncHandler(async (req, res) => {});

export {getAllFoundItems, createFoundItem, verifyAnswers};
