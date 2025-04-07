import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // will throw if expired
            req.user = await User.findById(decoded.id).select("-password");
            return next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token expired. Please login again." });
            }
            return res.status(401).json({ message: "Not authorized. Token failed." });
        }
    }

    return res.status(401).json({ message: "Not authorized. No token." });
};
