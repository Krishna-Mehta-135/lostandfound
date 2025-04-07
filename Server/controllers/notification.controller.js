export const requestNotification = asyncHandler(async (req, res) => {
    const { category } = req.body;
    const email = req.user.email;

    if (!email || !category) {
        return res.status(400).json(new ApiResponse(400, null, "Email and category are required"));
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

    return res
        .status(201)
        .json(new ApiResponse(201, null, "Notification request submitted"));
});
