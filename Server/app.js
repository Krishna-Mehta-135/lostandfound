import dotenv from "dotenv";
dotenv.config();

import claimRouter from "./routers/claim.routes.js";
import { itemsRouter } from "./routers/foundItems.routes.js";

import express from 'express';

const app = express();

app.use(express.json())

//Routes

app.use("/api/v1/foundItems" , itemsRouter)
app.use("/api/claims", claimRouter);

export {app}