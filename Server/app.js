import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});

import cors from "cors";
import express from "express";

import claimRouter from "./routers/claim.routes.js";
import { itemsRouter } from "./routers/foundItems.routes.js";

const app = express();

// CORS Configuration
app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type"],
      credentials:false,
    })
  );
  
// Handle Preflight OPTIONS request

app.use(express.json());

// Routes
app.use("/api/v1/foundItems", itemsRouter);
app.use("/api/v1/claims", claimRouter);

export { app };
