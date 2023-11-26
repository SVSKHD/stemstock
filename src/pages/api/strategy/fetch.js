import db from "@/backend/db/db";
import { createRouter } from "next-connect";
import Strategy from "@/backend/models/strategy";

const App = createRouter();

// Connect to DB outside of the request handler
db.connectDb();

App.get(async (req, res) => {
  const { id } = req.query;
  try {
    const strategyByUser = await Strategy.find({ user: id });
    res.status(200).json(strategyByUser);
  } catch (error) {
    console.error("Error fetching strategy:", error);
    res.status(400).json({ success: false, message: "Sorry, couldn't fetch." });
  } finally {
    // Disconnect DB in finally block to ensure it runs regardless of try/catch outcome
    db.disconnectDb();
  }
});

export default App.handler();
