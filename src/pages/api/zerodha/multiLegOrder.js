import {createRouter} from "next-connect"
const KiteConnect = require("kiteconnect").KiteConnect;


const App = createRouter()
let kite = new KiteConnect({
  api_key: process.env.NEXT_PUBLIC_API_ZERODHA_KEY
});

// Assuming you have the access token
kite.setAccessToken("your_access_token");

async function placeMarketOrder(orderParams) {
  try {
    let orderResponse = await kite.placeOrder("regular", {
      exchange: orderParams.exchange,
      tradingsymbol: orderParams.tradingsymbol,
      transaction_type: orderParams.transaction_type,
      quantity: orderParams.quantity,
      product: orderParams.product,
      order_type: KiteConnect.ORDER_TYPE_MARKET
    });

    console.log("Order placed successfully", orderResponse);
  } catch (err) {
    console.error("Order placement failed", err);
  }
}

// Example usage
placeMarketOrder({
  exchange: "NSE",
  tradingsymbol: "RELIANCE",
  transaction_type: KiteConnect.TRANSACTION_TYPE_BUY,
  quantity: 1,
  product: KiteConnect.PRODUCT_MIS
});


export default App.handler()