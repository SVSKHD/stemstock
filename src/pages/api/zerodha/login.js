// pages/api/zerodha/login.js
import { KiteConnect } from "kiteconnect";
import { createRouter } from "next-connect";
import db from "@/backend/db/db";
import ZerodhaBroker from "@/backend/models/broker";

const App = createRouter();
// App.get(async (req, res) => {
//   try {
//     const { id } = req.params;
//     db.connectDb();
//     const keys = await ZerodhaBroker.find({ user: id });
//     console.log("keys", keys);
//     const kc = new KiteConnect({
//       api_key: process.env.NEXT_PUBLIC_API_ZERODHA_KEY,
//     });

//     const loginUrl = kc.getLoginURL();
//     res.status(200).json({ loginUrl, id: id });
//     db.disconnectDb();
//   } catch (error) {
//     res.status().json({
//       success: false,
//       message: "Sorry couldn't perform Zerodha Login",
//     });
//     db.disconnectDb();
//   }
// });

App.get(async (req, res) => {
  try {
    db.connectDb();
    const { id } = req.query;
    const keys = await ZerodhaBroker.findOne({ user: id });
    const APIKEY = keys.apiKey;
    const SECRET = keys.apiSecret;
    const kc = new KiteConnect({
      api_key: APIKEY,
    });
    const loginUrl = kc.getLoginURL();
    res.status(200).json(loginUrl);
    res.json({ keys, id });
    db.disconnectDb();
  } catch (error) {
    res.status().json({
      success: false,
      message: "Sorry couldn't perform Zerodha Login",
    });
    db.disconnectDb();
  }
});

export default App.handler();

// Initialize KiteConnect with your API key
// const kc = new KiteConnect({
//   api_key: process.env.NEXT_PUBLIC_API_ZERODHA_KEY,
// });

// const router = createRouter();

// // Route for initiating the login process
// router.get("/login", (req, res) => {
//   const loginUrl = kc.getLoginURL();
//   res.redirect(loginUrl); // Redirect the user to Zerodha login page
// });

// Route for handling the callback from Zerodha
// router.get('/callback', async (req, res) => {
//   const requestToken = req.query.request_token;
//   try {
//     const session = await kc.generateSession(requestToken, "your_api_secret");
//     // Store session for future use and redirect to your app's main page
//     // ... your code for session handling
//   } catch (error) {
//     // Handle error
//     res.status(500).send('Error in authentication');
//   }
// });

// You can also define other routes such as for placing an order

// Export the router as a handler
// export default router.handler();
