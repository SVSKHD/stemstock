// pages/api/orders.js
import { createRouter } from "next-connect";
import db from "@/backend/db/db";
import ZerodhaBroker from "@/backend/models/broker";
var KiteConnect = require("kiteconnect").KiteConnect;

const router = createRouter();

// ... existing GET route for fetching order status ...

// New POST route for closing orders
router.post(async (req, res) => {
  try {
    await db.connectDb();

     // You may also need orderType
    const keys = await ZerodhaBroker.findOne({ user: req.body.user });
    console.log("api" , keys)
    // const kite = new KiteConnect({
    //   api_key: keys.apiKey,
    // });
    // kite.setAccessToken(keys.accessToken);

    // // Cancel the order
    // let response = await kite.cancelOrder(orderType, orderId);
    // await db.disconnectDb();

    res.json({ success: true, keys});

  } catch (error) {
    console.error("Error closing order:", error);
    await db.disconnectDb();
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

export default router.handler();
