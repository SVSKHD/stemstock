import db from "@/backend/db/db";
import { createRouter } from "next-connect";
import Broker from "@/backend/models/broker";

const App = createRouter();

App.get(async (req, res) => {
  const { id } = req.query;
  try {
    db.connectDb();
    const BrokerByUser = await Broker.findOne({user:id})
    res.status(200).json(BrokerByUser);
    db.disconnectDb();
  } catch (error) {
    db.disconnectDb();
    res.status(400).json({ success: false, message: "sorry couldn't fetch" });
  }
});

export default App.handler();
