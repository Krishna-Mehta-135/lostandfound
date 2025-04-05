import dotenv from "dotenv";
dotenv.config();

import express from 'express';

const app = express();

app.use(express.json())

//Routes

app.use("/api/v1/foundItems" , ItemsRouter)

export {app}