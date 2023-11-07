// pages/api/instruments.js

import KiteConnect from "kiteconnect";
import nextConnect from "next-connect";

const App = nextConnect();

App.get(async (req, res) => {
  const apiKey = process.env.KITE_API_KEY;
  const apiSecret = process.env.KITE_API_SECRET;
  const requestToken = req.query.request_token;

  const kc = new KiteConnect({ api_key: apiKey });

  try {
    // Obtain the access token
    const session = await kc.generateSession(requestToken, apiSecret);
    const accessToken = session.access_token;

    // Fetch the full instruments list
    const instruments = await kc.getInstruments();

    // Logic to find ATM options would go here
    // As mentioned before, finding ATM options is not straightforward and requires further logic

    res.status(200).json({ status: "success", data: instruments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default App.handler();
