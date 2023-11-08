import { createRouter } from "next-connect";
import User from "@/backend/models/user"; // Adjust the import path as necessary
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "@/backend/db/db";

const App = createRouter();

App.post(async (req, res) => {
  const { email, phoneNo, firstName, lastName, password } = req.body;

  try {
    // Connect to MongoDB
    await db.connectDb();

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
    const token = jwt.sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ success: true, user: payload.user, token: token });
    await db.disconnectDb();
  } catch (error) {
    await db.connectDb()
    console.error(error.message);
    res.status(500).send("please send valid details");
    await db.disconnectDb();
  }
});

export default App.handler();
