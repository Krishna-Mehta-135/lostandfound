import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

// Trim credentials
const user = process.env.SMTP_USER?.trim();
const pass = process.env.SMTP_PASS?.trim();

// Create transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: true,
    auth: {
        user,
        pass,
    },
});

/**
 * Reusable email sender
 * @param {Object} options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Subject of the email
 * @param {string} [options.text] - Plain text version
 * @param {string} [options.html] - HTML version
 */
export const sendEmail = async ({ to, subject, text, html }) => {
    try {
        await transporter.sendMail({
            from: `"Lost & Found" <${user}>`,
            to,
            subject,
            text,
            html,
        });
    } catch (error) {
        console.error("❌ Error sending email:", error.message);
        throw error;
    }
};

export default transporter;
