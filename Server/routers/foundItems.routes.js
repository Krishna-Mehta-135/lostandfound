import { Router } from "express";
import {
    createFoundItem,
    getAllFoundItems,
    getFoundItemById // ✅ don't forget to import
} from "../controllers/itemController.js";

const itemsRouter = Router();

itemsRouter.route("/").get(getAllFoundItems);
itemsRouter.route("/create").post(createFoundItem);
itemsRouter.route("/:id").get(getFoundItemById); // ✅ route to fetch one item

export { itemsRouter };
