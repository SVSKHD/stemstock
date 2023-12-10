// pages/api/strategies/[id].js

import db from "@/backend/db/db";
import Strategy from "@/backend/models/strategy";
import { createRouter } from "next-connect";

const App = createRouter();

App.put(async (req, res) => {
  try {
    await db.connectDb();

    const strategyId = req.query.id;  // Get the strategy ID from the request query
    const updateData = req.body;

    // Find the strategy by ID and update it
    const updatedStrategy = await Strategy.findByIdAndUpdate(strategyId, updateData, { new: true });

    if (!updatedStrategy) {
      return res.status(404).json({ success: false, message: "Strategy not found" });
    }

    // Respond with the updated strategy
    res.status(200).json({ success: true, strategy: updatedStrategy });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ success: false, error: error.message });
  }
});

export default App.handler();
