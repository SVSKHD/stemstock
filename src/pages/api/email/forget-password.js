import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export default async function POST(request) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smt.google.com",
      port: 465,
      secure: true,
      auth: {
        user: "8svskhd@gmail.com",
        pass: "huvekurwgftfdbwz",
      },
    });

    const mailOption = {
      from: "8svskhd@gmail.com",
      to: "aquakart8@gmail.com",
      subject: "Send Email Tutorial",
      html: `
        <h3>Hello Augustine</h3>
        `,
    };

    await transporter.sendMail(mailOption);

    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Send Email" },
      { status: 500 }
    );
  }
}


var nodemailer = require("nodemailer");
//-----------------------------------------------------------------------------
export async function sendMail(subject, toEmail, otpText) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "8svskhd@gmail.com",
      pass: "huvekurwgftfdbwz",
    },
  });

  var mailOptions = {
    from: "8svskhd@gmail.com",
    to: toEmail,
    subject: subject,
    text: otpText,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error(error);
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}