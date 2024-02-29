// pages/api/zerodha/login.js
import { KiteConnect } from "kiteconnect";
import { createRouter } from "next-connect";
import db from "@/backend/db/db";
import ZerodhaBroker from "@/backend/models/broker";

const App = createRouter();

App.get(async (req, res) => {
  try {
    await db.connectDb();
    const { id } = req.query;
    const keys = await ZerodhaBroker.findOne({ user: id });
    const APIKEY = keys.apiKey;
    const SECRET = keys.apiSecret; // Note: The secret is usually not used here, but ensure it's securely handled
    console.log("keys" , keys)
    const kc = new KiteConnect({
      api_key: APIKEY,
    });

    // Define your redirect URL here
    const redirectUrl = encodeURIComponent(`${process.env.NEXT_PUBLIC_API_ZERODHA_REDIRECT}`);

    // Generate the login URL with the redirect URL
    const loginUrl = `${kc.getLoginURL()}&redirect_uri=${redirectUrl}`;

    res.status(200).json({ loginUrl });
    await db.disconnectDb();
  } catch (error) {
    console.error("Error in Zerodha login: ", error); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Sorry, couldn't perform Zerodha login",
    });
    await db.disconnectDb();
  }
});

export default App.handler();
