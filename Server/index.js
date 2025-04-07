import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});

import connectDb from "./db/index.js";
import { app } from "./app.js";
import { scheduleItemExpiryJob } from "./cron/expireItems.js"; // ⏰ Import cron

connectDb()
    .then(() => {
        // Start the cron job before the server
        scheduleItemExpiryJob();

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("Mongo Db connection failed");
    });
