import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});

import claimRouter from "./routers/claim.routes.js";
import {itemsRouter} from "./routers/foundItems.routes.js";

import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173", // or the URL of your deployed frontend
        credentials: false, // if using cookies or sessions
    })
);

//Routes

app.use("/api/v1/foundItems", itemsRouter);
app.use("/api/v1/claims", claimRouter);

export {app};
