// pages/api/orders.js
import { createRouter } from "next-connect";
import db from "@/backend/db/db";
import ZerodhaBroker from "@/backend/models/broker";
var KiteConnect = require("kiteconnect").KiteConnect;

const router = createRouter();

router.get(async (req, res) => {
  try {
    await db.connectDb();

    const { id, orderId } = req.query;
    const keys = await ZerodhaBroker.findOne({ user: id });
    const kite = new KiteConnect({
      api_key: keys.apiKey,
    });
    kite.setAccessToken(keys.accessToken);
    let orders = await kite.getOrders();
    let order = orders.find((o) => o.order_id === orderId);
    await db.disconnectDb();

    if (order) {
      res.json({ status: order.status });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    console.error("Error fetching order status:", error);
    await db.disconnectDb();
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router.handler();
