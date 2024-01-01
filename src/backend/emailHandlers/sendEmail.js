import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const pass = process.env.PASS;

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Gmail SMTP server address
  port: 587, // Port for TLS/STARTTLS
  secure: false,
  auth: {
    user: email,
    pass: pass,
  },
});

export const mailOptions = {
  from: email,
  to: email,
};
