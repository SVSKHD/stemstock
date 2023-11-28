// File: /pages/api/placeOrders.js
import { createRouter } from "next-connect";
import KiteConnect from "kiteconnect";

const router = createRouter();

// Configure your Kite Connect API key and secret
const apiKey = "YOUR_API_KEY";
const apiSecret = "YOUR_API_SECRET";

router.post(async (req, res) => {
    res.json(req.body)
    const { requestToken, legs } = req.body; // Assuming 'legs' is part of the request body

    const kite = new KiteConnect({
        api_key: apiKey
    });

    try {
        const session = await kite.generateSession(requestToken, apiSecret);
        kite.setAccessToken(session.access_token);

        // Function to place an order for a single leg
        const placeOrderForLeg = async (leg) => {
            const orderDetails = {
                exchange: "NSE",
                tradingsymbol: leg.instrument,
                transaction_type: "BUY",
                quantity: leg.quantity,
                order_type: "MARKET",
                product: leg.product,
                price: leg.price,
              };

            return await kite.placeOrder("regular", orderDetails);
        };

        // Placing orders for each leg
        const orderResponses = await Promise.all(legs.map(leg => placeOrderForLeg(leg)));

        // Sending back the response
        res.status(200).json(orderResponses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router.handler();
