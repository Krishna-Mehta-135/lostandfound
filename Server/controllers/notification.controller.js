import { asyncHandler } from "../utils/asyncHandler.js";
import NotificationRequest from "../models/notificationRequest.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendEmail } from "../utils/sendEmail.js"; // ✅ Make sure this is imported!

export const requestNotification = asyncHandler(async (req, res) => {
    const { category } = req.body;
    const email = req.user.email;

    if (!email || !category) {
        return res
            .status(400)
            .json(new ApiResponse(400, null, "Email and category are required"));
    }

    const existing = await NotificationRequest.findOne({
        email,
        category,
        notified: false,
    });

    if (existing) {
        return res.status(400).json(
            new ApiResponse(400, null, "You have already requested a notification for this category")
        );
    }

    await NotificationRequest.create({ email, category });

    // ✅ Send confirmation email
    try {
        await sendEmail({
            to: email,
            subject: "Notification Subscription Confirmed",
            text: `You have successfully subscribed for notifications in the "${category}" category.`,
        });
        console.log(`✅ Confirmation email sent to ${email}`);
    } catch (error) {
        console.error("❌ Failed to send subscription confirmation email:", error);
        // Optional: Still proceed even if email fails
    }

    return res
        .status(201)
        .json(new ApiResponse(201, null, "Notification request submitted"));
});

