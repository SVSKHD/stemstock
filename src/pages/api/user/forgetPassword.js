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

async function sendEmail() {
  try {
    let info = await transporter.sendMail({
      from: '"8svskhd@gmail.com',  // Sender address
      to: 'koushik.svsk@gmail.com',                // List of receivers
      subject: 'Hello ✔',                         // Subject line
      text: 'Hello world?',                       // Plain text body
      html: '<b>Hello world?</b>',                // HTML body content
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error occurred while sending email:', error);
  }
}

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

const CONTACT_MESSAGE_FIELDS = {
  name: "Name",
  email: "Email",
  subject: "Subject",
  message: "Message",
};

const generateEmailContent = (data) => {
  const stringData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
    ""
  );
  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    return (str += `<h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left">${val}</p>`);
  }, "");

  return {
    text: stringData,
    html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>New Contact Message</h2> <div class="form-container">${htmlData}</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`,
  };
};

App.post(async (req, res) => {
  const { email } = req.body;
  console.log("email", email);
  await sendEmail()
});

export default App.handler();
