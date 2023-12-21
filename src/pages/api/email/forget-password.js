import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export default async function POST(request) {
  try {
    const transporter = nodemailer.createTransport({
      service: "google",
      host: "smt.google.com",
      port: 465,
      secure: true,
      auth: {
        user: "storyplank.com@gmail.com",
        pass: "gdbt sauu vpqf nmgd",
      },
    });

    const mailOption = {
      from: "storyplank.com@gmail.com",
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
