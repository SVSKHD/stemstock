import { createRouter } from "next-connect";
import User from "@/backend/models/user";
import bcrypt from "bcryptjs";
import db from "@/backend/db/db";
import nodemailer from "nodemailer";
import {
  mailOptions,
  transporter,
} from "../../../backend/emailHandlers/sendEmail";

// import { Resend } from "resend";

// const resend = new Resend("re_AaMTqCs6_7gAFg3rNDYrxo45BdoMu3uvi");

const App = createRouter();

// async function sendEmail(to, subject, text) {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: "8svskhd@gmail.com",
//       pass: "gtvg hfha yunh fled",
//     },
//   });

//   await transporter.sendMail({
//     from: "8svskhd@gmail.com",
//     to,
//     subject,
//     text,
//   });
// }

const generateUniqueNumber = () => {
  let number;
  do {
    number = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
  } while (generatedNumbers.has(number));
  generatedNumbers.add(number);
  return number;
};

App.post(async)


export default App.handler()

