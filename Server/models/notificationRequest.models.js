import mongoose from "mongoose";

const notificationRequestSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ["Jewelry", "Clothes", "Electronics", "Stationary", "Bottles&Tiffin"],
        },
        notified: {
            type: Boolean,
            default: false,
        },
    },
    {timestamps: true}
);

export default mongoose.model("NotificationRequest", notificationRequestSchema);
