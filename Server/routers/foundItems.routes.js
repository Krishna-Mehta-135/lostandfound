import { Router } from "express";
import { createFoundItem, getAllFoundItems } from "../controllers/itemController.js";

const itemsRouter = Router()

itemsRouter.route("/").get(getAllFoundItems)
itemsRouter.route("/create").post(createFoundItem)

export {itemsRouter}