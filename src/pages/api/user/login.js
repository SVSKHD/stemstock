import { createRouter } from "next-connect";
import mongoose from "mongoose";
import User from "../../models/UserModel"; // Adjust the import path as necessary
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const App = createRouter();

App.post(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials.");
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user._id,
        email: user.email,
        lastname: user.lastName,
        firstname: user.firstName,
        phone: user.phoneNo,
      },
    };

    // Sign the token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ success: true, user: payload.user, token: token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

export default App.handler();
