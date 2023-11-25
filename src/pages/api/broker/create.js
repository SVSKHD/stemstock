

import db from "@/backend/db/db";
import Broker from "@/backend/models/broker";
import { createRouter } from "next-connect";

const App = createRouter();

App.post(async (req, res) => {
  try {
    db.connectDb();
    const newStrategy = new Broker(req.body);
    // Save the new strategy to the database
    await newStrategy.save();
    // Respond with a success message and the saved strategy
    res.status(200).json({ success: true, strategy: newStrategy });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ success: false, error: error.message });
  }
});

export default App.handler();
