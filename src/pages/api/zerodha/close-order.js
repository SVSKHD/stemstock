// pages/api/orders.js
import { createRouter } from "next-connect";
import db from "@/backend/db/db";
import ZerodhaBroker from "@/backend/models/broker";
var KiteConnect = require("kiteconnect").KiteConnect;

const router = createRouter();

router.post(async (req, res) => {
  try {
    const { orderId } = req.body; // Assuming orderId is sent in the request body
    const { id } = req.query;
   

    // Ensure connection to the database
    await db.connectDb();

    // Find the broker details for the user
    const brokerDetails = await ZerodhaBroker.findOne({ user: id });
    if (!brokerDetails) {
      // Handle the case where the broker details are not found
      return res.status(404).json({ message: "Broker details not found." });
    }

    // Initialize KiteConnect with the found keys
    const kite = new KiteConnect({
      api_key: brokerDetails.apiKey,
      access_token: brokerDetails.accessToken
    });

    // Close the order
    await kite.cancelOrder(orderId); // Replace with the actual method to close the order

    // Respond with success message
    res.status(200).json({ message: "Order closed successfully" });
  } catch (error) {
    console.error("Error in POST /api/orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// router.post((req, res) => {
//   const { orderId } = req.body;
//   console.log("req", orderId);
// });

export default router.handler();
