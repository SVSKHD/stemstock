import { createRouter } from "next-connect";

const App = createRouter();

// Route to create a new trading strategy
App.post(async (req, res) => {
  try {
    const newTradingStrategy = await TradingStrategy.create(req.body);
    res.status(201).json(newTradingStrategy);
  } catch (error) {
    console.error("Error creating trading strategy:", error);
    res.status(500).json({ error: "Error creating trading strategy" });
  }
});

// Route to retrieve all trading strategies
App.get(async (req, res) => {
  try {
    const tradingStrategies = await TradingStrategy.find();
    res.status(200).json(tradingStrategies);
  } catch (error) {
    console.error("Error retrieving trading strategies:", error);
    res.status(500).json({ error: "Error retrieving trading strategies" });
  }
});

// Route to retrieve a specific trading strategy by ID
App.get(async (req, res) => {
  const { id } = req.query;
  try {
    const tradingStrategy = await TradingStrategy.findById(id);
    if (!tradingStrategy) {
      return res.status(404).json({ error: "Trading strategy not found" });
    }
    res.status(200).json(tradingStrategy);
  } catch (error) {
    console.error("Error retrieving trading strategy:", error);
    res.status(500).json({ error: "Error retrieving trading strategy" });
  }
});

// Route to update a specific trading strategy by ID
App.put(async (req, res) => {
  const { id } = req.query;
  try {
    const updatedTradingStrategy = await TradingStrategy.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedTradingStrategy) {
      return res.status(404).json({ error: "Trading strategy not found" });
    }
    res.status(200).json(updatedTradingStrategy);
  } catch (error) {
    console.error("Error updating trading strategy:", error);
    res.status(500).json({ error: "Error updating trading strategy" });
  }
});

// Route to delete a specific trading strategy by ID
handler.delete(async (req, res) => {
  const { id } = req.query;
  try {
    const deletedTradingStrategy = await TradingStrategy.findByIdAndRemove(id);
    if (!deletedTradingStrategy) {
      return res.status(404).json({ error: "Trading strategy not found" });
    }
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting trading strategy:", error);
    res.status(500).json({ error: "Error deleting trading strategy" });
  }
});

export default App.handler();
