import nodemailer from "nodemailer";

// let config = {
//   host: "smtp.google.com",
//   service: "gmail",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "8svskhd@gmail.com",
//     pass: "gtvg hfha yunh fled",
//   },
// };

// let transport = nodemailer.createTransport(config);

// const mailoptions = {
//   from: from,
//   to: to,
//   subject: subject,
//   text: text,
//   html: html,
// };

// const TransitEmail = async (mailoptions) => {
//   try {
//     await transport.SendEmail(mailoptions);
//   } catch (error) {
//     console.log(error);
//   }
// };
// export default TransitEmail;

// import nodemailer from "nodemailer";

// // Function to send an email
// async function sendEmail({ from, to, subject, text, html }) {
//   // Create a transporter object using the default SMTP transport
//   const transporter = nodemailer.createTransport("SMTP", {
//     service: "gmail",
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: "8svskhd@gmail.com",
//       pass: "gtvg hfha yunh fled",
//     },
//   });

//   // Email options
//   const mailOptions = {
//     from, // Sender address
//     to, // List of receivers
//     subject, // Subject line
//     text, // Plain text body
//     html, //html
//   };

//   // Send the email
//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", info.response);
//     return info;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw error;
//   }
// }

// export default sendEmail;


//-----------------------------------------------------------------------------
export async function sendMail(subject, toEmail, otpText) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "8svskhd@gmail.com",
      pass: "gtvg hfha yunh fled",
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
