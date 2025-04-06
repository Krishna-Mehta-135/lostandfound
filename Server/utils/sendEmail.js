import dotenv from "dotenv";
dotenv.config(); // Load .env variables first

import nodemailer from "nodemailer";

// Trim credentials
const user = process.env.SMTP_USER?.trim();
const pass = process.env.SMTP_PASS?.trim();

// Create transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: true, // Use true if you're on port 465
    auth: {
        user,
        pass,
    },
});

// Reusable email sender function
export const sendEmail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: `"Lost & Found" <${user}>`,
            to,
            subject,
            text,
        });

    } catch (error) {
        throw error;
    }
};

export default transporter;
