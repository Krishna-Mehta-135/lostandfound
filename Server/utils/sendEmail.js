import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

const sendEmail = async (to, subject, text) => {
    await transporter.sendMail({
        from: `"Lost & Found" <${process.env.MAIL_USER}>`,
        to,
        subject,
        text,
    });
};

export default sendEmail;
