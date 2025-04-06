import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    secure: process.env.MAIL_PORT === "465",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    logger: true,
    debug: true,
});

const sendTestEmail = async () => {
    try {
        const info = await transporter.sendMail({
            from: `"Lost & Found" <${process.env.MAIL_USER}>`,
            to: "yourfriend@example.com", // 👈 Put your friend's real email here
            subject: "✅ Test Email from Lost & Found",
            text: "Hey! This is a test email from the Lost & Found project. Everything is working! 🎉",
        });
        console.log("✅ Email sent:", info.messageId);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};

sendTestEmail();
