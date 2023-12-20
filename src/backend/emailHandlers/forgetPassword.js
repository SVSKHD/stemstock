import nodemailer from "nodemailer";

const sendEmail = async ({ from, to, subject, text, content }) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Replace with your email service
      auth: {
        user: "8svskhd@gmail.com",
        pass: "Hithesh.svsk123", // Your email password
      },
    });

    // Set up email options
    const mailOptions = {
      from: from, // Sender address
      to: to, // List of recipients
      subject: subject, // Subject line
      text: text, // Plain text body
      html: `<b>${content}</b>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Or handle the error as per your application's need
  }
};

export default sendEmail;
