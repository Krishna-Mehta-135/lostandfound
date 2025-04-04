export const asyncHandler = (requestHandler) => async (req, res, next) => {
    try {
        await requestHandler(req, res, next);
    } catch (error) {
        console.log("Error in asyncHandler: ", error);
        res.status(
            error.statusCode && error.statusCode >= 100 && error.statusCode <= 600 ? error.statusCode : 500
        ).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
