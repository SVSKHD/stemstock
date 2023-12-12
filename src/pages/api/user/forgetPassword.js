import { createRouter } from "next-connect";
import User from "@/backend/models/user";
import bcrypt from "bcryptjs";
import db from "@/backend/db/db";

const App = createRouter();

App.post(async (req, res) => {
  try {
    await db.connectDb();
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.findByIdAndUpdate(user._id, { password: hashedPassword });
      return res.status(200).json({ message: "Password updated successfully." });
    } else {
      return res.status(200).json({ message: "User found, but no password provided." });
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
