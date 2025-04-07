import cron from "node-cron";
import FoundItem from "../models/Items.model.js";

export const scheduleItemExpiryJob = () => {
    cron.schedule("0 0 * * *", async () => {
        console.log("Running daily item expiration job...");

        const twentyDaysAgo = new Date(Date.now() - 20 * 24 * 60 * 60 * 1000);

        try {
            const result = await FoundItem.updateMany(
                {
                    createdAt: {$lte: twentyDaysAgo},
                    isExpired: false,
                },
                {$set: {isExpired: true}}
            );

            console.log(`Expired ${result.modifiedCount} items.`);
        } catch (err) {
            console.error("Error running item expiration job:", err);
        }
    });
};
    