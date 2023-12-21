import { createRouter } from "next-connect";
import User from "@/backend/models/user";
import bcrypt from "bcryptjs";
import db from "@/backend/db/db";
import nodemailer from "nodemailer";
import {sendMail} from "../../../backend/emailHandlers/sendEmail"
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

// App.post(async (req, res) => {
//   try {
//     await db.connectDb();
//     const { email, password } = req.body;
//     const generatedNumbers = new Set();

//     const uniqueNumber = generateUniqueNumber();
//     // Example usage:
//     console.log("generate-key", uniqueNumber);
//     await sendEmail(email, "OTP Verification", `Your OTP is: ${uniqueNumber}`);

//     console.log(data);
//     if (!email) {
//       return res.status(400).json({ error: "Email is required." });
//     }

//     const user = await User.findOne({ email: email });
//     if (!user) {
//       return res.status(400).json({ error: "User not found." });
//     }

//     if (otp === generateUniqueNumber() && password) {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       await User.findByIdAndUpdate(user._id, { password: hashedPassword });
//       return res
//         .status(200)
//         .json({ message: "Password updated successfully." });
//     } else {
//       return res
//         .status(200)
//         .json({ message: "User found, but no password provided." });
//     }
//   } catch (error) {
//     // Generic error handling
//     return res.status(500).json({ error: "Internal server error." });
//   } finally {
//     // Disconnect from the database in the finally block
//     await db.disconnectDb();
//   }
// });

App.post(async (req, res) => {
  const { email } = req.body;
  console.log("email", email);
  await sendMail("hello" , email , "hello otp")
});

export default App.handler();
