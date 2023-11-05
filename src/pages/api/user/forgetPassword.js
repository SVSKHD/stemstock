import { createRouter } from "next-connect";
import mongoose from "mongoose";
import User from "../../models/UserModel"; // Adjust the import path as necessary
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "@/backend/db/db";

const App = createRouter();

App.post(async (req, res) => {
  const { email } = req.body;

  try {
    // Connect to MongoDB
    
    db.connectDb()

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Create token (could also include more info or use a separate email token strategy)
    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token valid for 1 hour
    );

    // TODO: Send email to user with the token in a link they can use to reset password
    // Example: `https://yourdomain.com/reset-password?token=${token}`

    // Respond with a message
    res.status(200).send("Password reset link has been sent to your email.");
    db.disconnectDb()
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
    db.disconnectDb()
  }
});

export default App.handler();
