import { createRouter } from "next-connect";
import mongoose from "mongoose";
import User from "../../models/UserModel"; // Adjust the import path as necessary
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const App = createRouter();

handler.post(async (req, res) => {
  const { email, phoneNo, firstName, lastName, password } = req.body;

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    // Check if user already exists
    let user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      return res.status(409).send("User already exists.");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    user = new User({
      email,
      phoneNo,
      firstName,
      lastName,
      password: hashedPassword,
    });

    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign the token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ success: true, user: payload.user, token: token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("please send valid details");
  }
});

export default App.handler();
