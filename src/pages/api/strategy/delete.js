// pages/api/strategies/[id].js

import db from "@/backend/db/db";
import Strategy from "@/backend/models/strategy";
import { createRouter } from "next-connect";

const App = createRouter();

// DELETE endpoint
App.delete(async (req, res) => {
  try {
    await db.connectDb();

    const strategyId = req.query.id; // Get the strategy ID from the request query

    // Find the strategy by ID and delete it
    const deletedStrategy = await Strategy.findByIdAndDelete(strategyId);

    if (!deletedStrategy) {
      return res
        .status(404)
        .json({ success: false, message: "Strategy not found" });
    }

    // Respond with a success message
    res
      .status(200)
      .json({ success: true, message: "Strategy deleted successfully" });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ success: false, error: error.message });
  }
});

export default App.handler();
