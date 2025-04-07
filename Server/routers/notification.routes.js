import { Router } from "express";
import { requestNotification } from "../controllers/notification.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/subscribe",protect, requestNotification);

export { router as notificationRouter };
