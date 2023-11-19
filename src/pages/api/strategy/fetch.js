import db from "@/backend/db/db";
import { createRouter } from "next-connect";
import Strategy from "@/backend/models/strategy";

const App = createRouter();

App.get(async (req, res) => {
  const { id } = req.query;
  try {
    db.connectDb();
    const startegyByUser = await Strategy.findOne({user:id})
    res.status(200).json(startegyByUser);
    db.disconnectDb();
  } catch (error) {
    db.disconnectDb();
    res.status(400).json({ success: false, message: "sorry couldn't fetch" });
  }
});

export default App.handler();
