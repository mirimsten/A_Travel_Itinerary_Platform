// Import nodemailer
import nodemailer from 'nodemailer';

// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'Zoho',
    auth: {
        user: 'no-reply@travelapp.website', // your email
        pass: ']YPkVGh&2>;fp#Y' // your email password
    }
});

// Function to send welcome email
export const sendWelcomeEmail = (email) => {
    const mailOptions = {
        from: 'no-reply@travelapp.website',
        to: email,
        subject: 'Welcome to TravelApp!',
        text: 'Thank you for registering with TravelApp. We hope you have a great experience!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
};