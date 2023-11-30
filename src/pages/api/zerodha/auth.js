// pages/api/auth.js
import { createRouter } from "next-connect";
import axios from 'axios';

const router = createRouter();

router.use((req, res, next) => {
  // Middleware to extract query parameters
  const { code } = req.query;
  const clientId = process.env.ZERODHA_CLIENT_ID;
  const clientSecret = process.env.ZERODHA_CLIENT_SECRET;
  const redirectUri = process.env.ZERODHA_REDIRECT_URI;

  // Exchange the authorization code for an access token
  axios
    .post('https://kite.zerodha.com/api/v3/token', {
      grant_type: 'authorization_code',
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    })
    .then((response) => {
      // You can now use response.data to access the access token
      const accessToken = response.data.access_token;

      // Store the access token securely or use it for making authorized API calls

      // Respond to the client as needed
      res.status(200).json({ accessToken });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Unable to obtain access token' });
    });
});

export default router.handler();
