import { Router } from "express";
import {
    createFoundItem,
    getAllFoundItems,
    getFoundItemById,
    getMyFoundItems
} from "../controllers/itemController.js";

import { protect } from "../middlewares/auth.middleware.js";

const itemsRouter = Router();

// 🔒 All routes protected

itemsRouter.route("/my").get(protect, getMyFoundItems);         // move this up
itemsRouter.route("/").get(protect, getAllFoundItems);
itemsRouter.route("/create").post(protect, createFoundItem);
itemsRouter.route("/:id").get(protect, getFoundItemById);       // move this below specific routes

export { itemsRouter };
