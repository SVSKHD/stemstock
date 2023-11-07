import KiteConnect from "kiteconnect";

export default async function handler(req, res) {
    const apiKey = "your_api_key"; // Replace with your Zerodha API key
    const apiSecret = "your_api_secret"; // Replace with your Zerodha API secret
    const requestToken = req.query.request_token; // This should be obtained after the user logs in through the Zerodha login page

    const kc = new KiteConnect({ api_key: apiKey });

    try {
        // Obtain the access token
        const session = await kc.generateSession(requestToken, apiSecret);

        // Establish a WebSocket connection
        const ticker = new KiteConnect.KiteTicker({
            api_key: apiKey,
            access_token: session.access_token,
        });

        ticker.connect();
        ticker.on('ticks', (ticks) => {
            // Handle the real-time ticks here or send them to the frontend
        });

        ticker.on('connect', () => {
            console.log("Connected successfully");
            // You can subscribe to instruments here
        });

        // Send back the necessary details to the frontend
        res.status(200).json({ status: "success", access_token: session.access_token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message });
    }
}
