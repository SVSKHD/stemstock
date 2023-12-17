import { createRouter } from "next-connect";
import User from "@/backend/models/user"; // Adjust the import path as necessary
import db from "@/backend/db/db";

const App = createRouter();

App.put(async (req, res) => {
  try {
    await db.connectDb();
    const { id } = req.query;
    let updateData = { ...req.body };

    // Remove the password field from the update data if it exists
    if (updateData.password) {
      delete updateData.password;
    }

    console.log("data", updateData);

    // Find the user by ID and update
    const user = await User.findOneAndUpdate({ _id: id }, updateData, {
      new: true, // Return the updated document
      runValidators: true, // If your schema defines validators, this will ensure they're applied on update
      omitUndefined: true, // Omit fields that are undefined
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const payload = {
      user: {
        id: user._id,
        email: user.email,
        lastname: user.lastName,
        firstname: user.firstName,
        phone: user.phoneNo,
      },
    };

    res.status(200).json({ success: true, user: payload.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  } finally {
    await db.disconnectDb();
  }
});

export default App.handler();
