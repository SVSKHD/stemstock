// // File: /pages/api/placeOrders.js
// import { createRouter } from "next-connect";
// import KiteConnect from "kiteconnect";

// const router = createRouter();

// // Configure your Kite Connect API key and secret
// const apiKey = process.env.NEXT_PUBLIC_API_ZERODHA_KEY;
// const apiSecret = process.env.NEXT_PUBLIC_API_ZERODHA_SECRET;

// router.post(async (req, res) => {
//     res.json(req.body)
//     const { requestToken, legs } = req.body; // Assuming 'legs' is part of the request body

//     const kite = new KiteConnect({
//         api_key: apiKey
//     });

//     try {
//         const session = await kite.generateSession(requestToken, apiSecret);
//         kite.setAccessToken(session.access_token);

//         // Function to place an order for a single leg
//         const placeOrderForLeg = async (leg) => {
//             const orderDetails = {
//                 exchange: "NSE",
//                 tradingsymbol: leg.instrument,
//                 transaction_type: "BUY",
//                 quantity: leg.quantity,
//                 order_type: "MARKET",
//                 product: leg.product,
//                 price: leg.price,
//               };

//             return await kite.placeOrder("regular", orderDetails);
//         };

//         // Placing orders for each leg
//         const orderResponses = await Promise.all(legs.map(leg => placeOrderForLeg(leg)));

//         // Sending back the response
//         res.status(200).json(orderResponses);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// export default router.handler();


// File: /pages/api/placeOrders.js
import { createRouter } from "next-connect";
import  {KiteConnect}  from "kiteconnect";


const router = createRouter();

// Use environment variables for API key and secret
const apiKey = process.env.NEXT_PUBLIC_API_ZERODHA_KEY;
const apiSecret = process.env.NEXT_PUBLIC_API_ZERODHA_SECRET;

router.post(async (req, res) => {
    const { requestToken, legs } = req.body;

    const kite = new KiteConnect({
        api_key: apiKey
    });

    try {
        const session = await kite.generateSession(requestToken, apiSecret);
        kite.setAccessToken(session.access_token);

        const orderResponses = [];

        for (const leg of legs) {
            try {
                const orderParams = {
                    exchange: "NSE", // Default to NSE if not specified
                    tradingsymbol: leg.instrument,
                    transaction_type: leg.position === "SELL" ? "SELL" : "BUY", // Adjust based on leg position
                    quantity: parseInt(leg.quantity),
                    order_type: leg.order_type || "MARKET", // Default to MARKET if not specified
                    product: leg.product || "CNC", // Default to CNC if not specified
                    price: parseFloat(leg.price) || 0, // Default to 0 if not specified
                };

                const response = await kite.placeOrder("regular", orderParams);
                console.log("Order placed successfully", response.order_id);
                orderResponses.push({ legId: leg._id, orderId: response.order_id, status: "success" });
            } catch (orderError) {
                orderResponses.push({ legId: leg._id, status: "failed", error: orderError.message });
            }
        }

        res.status(200).json(orderResponses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router.handler();


