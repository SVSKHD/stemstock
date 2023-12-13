import db from "@/backend/db/db";
import { createRouter } from "next-connect";
import Strategy from "@/backend/models/strategy";

const App = createRouter();

App.get(async (req, res) => {
  const { id } = req.query;
  try {
    // Connect to DB (consider moving outside of handler if applicable)
    await db.connectDb();

    // Fetch the strategy by ID
    const strategyById = await Strategy.findById(id);
    if (!strategyById) {
      return res.status(404).json({ success: false, message: "Strategy not found." });
    }
    res.status(200).json(strategyById);
  } catch (error) {
    console.error("Error fetching strategy:", error);
    res.status(500).json({ success: false, message: "Sorry, couldn't fetch." });
  } finally {
    // Disconnect DB in finally block
    await db.disconnectDb();
  }
});

export default App.handler();
