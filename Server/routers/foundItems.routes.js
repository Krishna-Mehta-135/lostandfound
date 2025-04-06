import { Router } from "express";
import { createFoundItem, getAllFoundItems, verifyAnswers } from "../controllers/itemController";

const itemsRouter = Router()

itemsRouter.route("/").get(getAllFoundItems)
itemsRouter.route("/").post(createFoundItem)
itemsRouter.route("/verify/:id").get(verifyAnswers)

export {itemsRouter}