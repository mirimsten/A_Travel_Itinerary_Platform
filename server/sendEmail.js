import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

export const sendWelcomeEmail = async (userName, email) => {
    console.log("nnnnnnnbbbbb");
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Welcome to Our Application',
        text: `${userName}, Thank you for registering! We are glad to have you with us.`,
    };

    try {
        console.log('blablabla');
        await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent to ${to}`);
    } catch (error) {
        console.error(`Error sending email to ${to}:`, error);
    }
};
