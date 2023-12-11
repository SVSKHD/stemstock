import db from "@/backend/db/db";
import { createRouter } from "next-connect";
import Strategy from "@/backend/models/strategy";

const App = createRouter();

App.put(async (req, res) => {
  try {
    db.connectDb();
    const { id, status } = req.body;
    // Validate input
    if (!id || typeof status !== "boolean") {
      return res.status(400).json({ message: "Invalid input" });
    }

    // Find the strategy by ID and update its status
    const updatedStrategy = await Strategy.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    // Check if the strategy was found and updated
    if (!updatedStrategy) {
      return res.status(404).json({ message: "Strategy not found" });
    }

    res
      .status(200)
      .json({ message: "Status updated", strategy: updatedStrategy });
    db.disconnectDb(0);
  } catch (error) {
    res.status(500).json({ message: error.message });
    db.disconnectDb();
  }
});

export default App.handler();
