// // File: /pages/api/placeOrders.js
import { createRouter } from "next-connect";
import db from "@/backend/db/db";
var KiteConnect = require("kiteconnect").KiteConnect;
import ZerodhaBroker from "@/backend/models/broker";

const router = createRouter();

const createInstrument = () =>{
  
}

router.post(async (req, res) => {
  const { legs } = req.body; // Assuming 'legs' is part of the request body
  const { id } = req.query;
  try {
    await db.connectDb();
    const keys = await ZerodhaBroker.findOne({ user: id });
    const kite = new KiteConnect({
      api_key: keys.apiKey,
    });
    kite.setAccessToken(keys.accessToken);
    console.log("log", keys.accessToken);
    // Function to place an order for a single leg
    const placeOrderForLeg = async (leg) => {
      const orderDetails = {
        exchange: "NFO",
        tradingsymbol: "NIFTY23DEC19000CE",
        transaction_type: "BUY", // or "SELL" depending on your strategy
        quantity: 1, // The number of contracts you wish to buy/sell
        order_type: "MARKET", // or "LIMIT" if you want to specify a price
        product: "MIS", // or "MIS" for intraday trades, "CNC" for equities
      };

      return await kite.placeOrder("regular", orderDetails);
    };

    // Placing orders for each leg
    const orderResponses = await Promise.all(
      legs.map((leg) => placeOrderForLeg(leg))
    );

    // Sending back the response
    res.status(200).json(orderResponses);
    db.disconnectDb();
  } catch (error) {
    res.status(500).json({ error: error.message });
    db.disconnectDb();
  }
});

export default router.handler();

// // File: /pages/api/placeOrders.js
// import { createRouter } from "next-connect";
// import { KiteConnect } from "kiteconnect";
// import db from "@/backend/db/db";
// import ZerodhaBroker from "@/backend/models/broker";

// const router = createRouter();

// // Use environment variables for API key and secret
// const apiKey = process.env.NEXT_PUBLIC_API_ZERODHA_KEY;
// const apiSecret = process.env.NEXT_PUBLIC_API_ZERODHA_SECRET;

// router.post(async (req, res) => {
//   const { requestToken, legs } = req.body;

//   const kite = new KiteConnect({
//     api_key: apiKey,
//   });

//   try {
//     db.connectDb();
//     const { id } = req.query;
//     const keys = await ZerodhaBroker.findOne({ user: id });
//     const APIKEY = keys.apiKey;
//     const SECRET = keys.apiSecret;
//     const ACCESS = keys.accessToken;

//     kite.setAccessToken(ACCESS);

//     const orderResponses = [];

//     for (const leg of legs) {
//       try {
//         const orderParams = {
//           exchange: "NSE", // Default to NSE if not specified
//           tradingsymbol: "NIFTY23DEC19000PE",
//           transaction_type: leg.position === "SELL" ? "SELL" : "BUY" || "BUY", // Adjust based on leg position
//           quantity: parseInt(leg.quantity) || 50,
//           order_type: leg.order_type || "MARKET", // Default to MARKET if not specified
//           validity: "DAY",
//           product: leg.product || "CNC", // Default to CNC if not specified, // Default to 0 if not specified
//         };

//         const response = await kite.placeOrder("regular", orderParams);
//         console.log("Order placed successfully", response.order_id);
//         orderResponses.push({
//           legId: leg._id,
//           orderId: response.order_id,
//           status: "success",
//         });
//       } catch (orderError) {
//         orderResponses.push({
//           legId: leg._id,
//           status: "failed",
//           error: orderError.message,
//         });
//       }
//     }
//     console.log("trades", legs , orderResponses);
//     db.disconnectDb();
//     res.status(200).json(orderResponses);
//   } catch (error) {
//     res.status(500).json({ error: error.message, legs: legs });
//     db.disconnectDb();
//   }
// });

// export default router.handler();

// import { createRouter } from "next-connect";
// import { KiteConnect } from "kiteconnect";
// import db from "@/backend/db/db";
// import ZerodhaBroker from "@/backend/models/broker";

// const router = createRouter();
// const apiKey = process.env.NEXT_PUBLIC_API_ZERODHA_KEY;

// router.post(async (req, res) => {
//   const { legs } = req.body;
//   const { id } = req.query;

//   try {
//     await db.connectDb();
//     const keys = await ZerodhaBroker.findOne({ user: id });
//     if (!keys || !keys.accessToken) {
//       throw new Error("Access token not found for the user");
//     }

//     const kite = new KiteConnect({ api_key: keys.apiKey });
//     kite.setAccessToken(keys.accessToken);

//     const orderResponses = await Promise.all(legs.map(async (leg) => {
//       try {
//         const orderParams = {
//           exchange: "NSE",
//           tradingsymbol: "NIFTY23DEC19000PE",
//           transaction_type: leg.position === "SELL" ? "SELL" : "BUY",
//           quantity: parseInt(leg.quantity) || 50,
//           order_type: leg.order_type || "MARKET",
//           validity: "DAY",
//           product: leg.product || "CNC",
//         };

//         const response = await kite.placeOrder("regular", orderParams);
//         return { legId: leg._id, orderId: response.order_id, status: "success" };
//       } catch (orderError) {
//         return { legId: leg._id, status: "failed", error: orderError.message };
//       }
//     }));

//     res.status(200).json(orderResponses);
//   } catch (error) {
//     console.error("Error in placing orders:", error);
//     res.status(500).json({ error: error.message });
//   } finally {
//     await db.disconnectDb();
//   }
// });

// export default router.handler();
