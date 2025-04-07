import User from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// Register
export const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    const existing = await User.findOne({email});
    if (existing) {
        return res.status(400).json(new ApiResponse(400, null, "User already exists"));
    }

    const user = await User.create({name, email, password});

    return res.status(201).json(
        new ApiResponse(
            201,
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            },
            "User registered successfully"
        )
    );
});

// Login
export const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json(new ApiResponse(401, null, "Invalid credentials"));
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            },
            "Login successful"
        )
    );
});

// Get logged in user
export const getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");

    return res.status(200).json(new ApiResponse(200, user, "User profile"));
});
