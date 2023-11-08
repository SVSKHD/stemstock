import { createRouter } from "next-connect";
import User from "@/backend/models/user"; // Adjust the import path as necessary
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "@/backend/db/db";

const App = createRouter();

App.post(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Connect to MongoDB
    db.connectDb();

    // Check if user exists
    const user = await User.findOne({ email: email });
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
    const token = jwt.sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ success: true, user: payload.user, token: token });
    db.disconnectDb();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
    db.disconnectDb();
  }
});

export default App.handler();
