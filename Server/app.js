import dotenv from "dotenv";
dotenv.config();

import claimRoutes from "./routes/claim.routes.js";
import { itemsRouter } from "./routers/foundItems.routes.js";

import express from 'express';

const app = express();

app.use(express.json())

//Routes

app.use("/api/v1/foundItems" , itemsRouter)
app.use("/api/claims", claimRoutes);

export {app}