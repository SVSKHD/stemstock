import db from "@/backend/db/db";
import Broker from "@/backend/models/broker";
import { createRouter } from "next-connect";

const App = createRouter();
App.delete(async (req, res) => {
  try {
    db.connectDb();
    const { id } = req.query;
    const deletedBroker = await Broker.findOneAndDelete({user:id})
    
    if (!deletedBroker) {
      return res
        .status(404)
        .json({ success: false, message: "Broker not found" });
    }

    res.status(200).json({ success: true, deletedId: deletedBroker._id });
  } catch (error) {
    console.error("Error during delete operation:", error);
    res.status(500).json({ success: false, message: "Failed to remove" });
  } finally {
    db.disconnectDb();
  }
});

export default App.handler();
