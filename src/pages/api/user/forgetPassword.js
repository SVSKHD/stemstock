import { createRouter } from "next-connect";
import User from "@/backend/models/user";
import bcrypt from "bcryptjs";
import db from "@/backend/db/db";
import sendEmail from "@/backend/emailHandlers/forgetPassword";
import { Resend } from "resend";

const resend = new Resend("re_Uw8WXDfw_KiEir28yNYmh9jLou4JLrfb2");

const App = createRouter();

App.post(async (req, res) => {
  try {
    await db.connectDb();
    const { email, password } = req.body;
    const generatedNumbers = new Set();


    function generateUniqueNumber() {
      let number;
      do {
        number = Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0");
      } while (generatedNumbers.has(number));
      generatedNumbers.add(number);
      return number;
    }

   const uniqueNumber = generateUniqueNumber()
    // Example usage:
    console.log("generate-key", uniqueNumber);

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }
    console.log("user", user);
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Hello World",
      html: `<p>Welcome From Stem Fin here is your OTP ${generateUniqueNumber()}</strong>!</p>`,
    });
    if (otp === generateUniqueNumber() && password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.findByIdAndUpdate(user._id, { password: hashedPassword });
      return res
        .status(200)
        .json({ message: "Password updated successfully." });
    } else {
      return res
        .status(200)
        .json({ message: "User found, but no password provided." });
    }
  } catch (error) {
    // Generic error handling
    return res.status(500).json({ error: "Internal server error." });
  } finally {
    // Disconnect from the database in the finally block
    await db.disconnectDb();
  }
});

export default App.handler();
