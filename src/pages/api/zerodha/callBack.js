// pages/api/zerodha-callback.js
import { createRouter } from "next-connect";
import { KiteConnect } from "kiteconnect";

const App = createRouter();

App.post(async function handler(req, res) {
  const requestToken = req.body.request_token;

  if (!requestToken) {
    return res.status(400).json({ error: "No request token provided" });
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_API_ZERODHA_KEY;
    const apiSecret = process.env.API_ZERODHA_SECRET;

    const kc = new KiteConnect({ api_key: apiKey });

    // Exchange request token for access token using KiteConnect
    const session = await kc.generateSession(requestToken, apiSecret);
    const accessToken = session.access_token;

    // Store access token securely
    // TODO: Implement secure storage for the access token

    res.json({ accessToken });
  } catch (error) {
    // Improved error handling
    console.error("Error in generating session: ", error);
    if (error.status) {
      res.status(error.status).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

export default App.handler();
