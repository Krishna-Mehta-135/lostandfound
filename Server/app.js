import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});

import cors from "cors";
import express from "express";

import {claimRouter} from "./routers/claim.routes.js";
import { itemsRouter } from "./routers/foundItems.routes.js";
import authRoutes from "./routers/auth.routes.js";
import { notificationRouter } from "./routers/notification.routes.js";

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle Preflight OPTIONS request

app.use(express.json());

// Routes
app.use("/api/v1/foundItems", itemsRouter);
app.use("/api/v1/claims", claimRouter);

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/notifications", notificationRouter);


export { app };
