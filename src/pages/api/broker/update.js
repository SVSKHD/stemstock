import db from "@/backend/db/db";
import { createRouter } from "next-connect";
import ZerodhaBroker from "@/backend/models/broker"; // Assuming you have updated the import

const App = createRouter();

App.put(async (req, res) => {
  const { id } = req.query; // Assuming the user ID is passed as a query parameter
  const { clientId, apiKey, apiSecret } = req.body; // Extracting updated details from the request body

  try {
    await db.connectDb();
    const updatedBroker = await ZerodhaBroker.findOneAndUpdate(
      { user: id }, // Filter by user ID
      { clientId, apiKey, apiSecret }, // Updated details
      { new: true } // Return the updated document
    );

    if (!updatedBroker) {
      return res.status(404).json({ success: false, message: "Broker not found" });
    }

    res.status(200).json({ success: true, updatedBroker });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating broker details" });
  } finally {
    db.disconnectDb();
  }
});

export default App.handler();
