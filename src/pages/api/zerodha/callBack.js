// pages/api/zerodha-callback.js
import { createRouter } from "next-connect";
import db from "@/backend/db/db";
import ZerodhaBroker from "@/backend/models/broker";
var KiteConnect = require("kiteconnect").KiteConnect;

const App = createRouter();

App.post(async (req, res) => {
  try {
    db.connectDb();
    const { id, requestToken } = req.query;
    const keys = await ZerodhaBroker.findOne({ user: id });
    const APIKEY = keys.apiKey;
    const SECRET = keys.apiSecret;
    console.log("keys", APIKEY, SECRET);
    if (!requestToken) {
      return res.status(400).json({ error: "Request token is missing" });
    }

    const kite = new KiteConnect({
      api_key: APIKEY,
    });

    const Access = await kite.generateSession(requestToken, SECRET);
    const AccessToken = Access.access_token

    // Fetch the access token using the request token
    // const userData = await kite.generateSession(requestToken, SECRET);
    // const accessToken = userData.access_token;
    const Broker = await ZerodhaBroker.findByIdAndUpdate(user, AccessToken);

    res.status(200).json({
      Success: true,
      message: "Access token saved successfully",
      APIKEY,
      SECRET,
      requestToken,
      AccessToken,
      Access,
      Broker
    });

    db.disconnectDb();
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Sorry couldn't perform the action" });
    db.disconnectDb();
  }
});

export default App.handler();
