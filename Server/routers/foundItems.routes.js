import { Router } from "express";
import {
    createFoundItem,
    getAllFoundItems,
    getFoundItemById
} from "../controllers/itemController.js";

import { protect } from "../middlewares/auth.middleware.js";

const itemsRouter = Router();

// 🔒 All routes protected
itemsRouter.route("/").get(protect, getAllFoundItems);
itemsRouter.route("/create").post(protect, createFoundItem);
itemsRouter.route("/:id").get(protect, getFoundItemById);

itemsRouter.route("/my").get(protect, getMyFoundItems); // get the finders submitted items on his dashboard

export { itemsRouter };
