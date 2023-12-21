// utils/sendEmail.js
import nodemailer from 'nodemailer';

async function sendEmail({ to, subject, text, html }) {
  try {
    // Create a transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "storyplank.com@gmail.com", // Your Gmail address
        pass: "gdbt sauu vpqf nmgd", // Your Gmail password or App Password
      },
    });

    // Set up email data
    const mailOptions = {
      from: "storyplank.com@gmail.com", // Sender address
      to, // Receiver email address
      subject, // Subject line
      text, // Plain text body
      html, // HTML body (optional)
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export default sendEmail;
