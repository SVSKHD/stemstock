// // File: /pages/api/placeOrders.js
import { createRouter } from "next-connect";
import db from "@/backend/db/db";
var KiteConnect = require("kiteconnect").KiteConnect;
import ZerodhaBroker from "@/backend/models/broker";

const router = createRouter();

router.post(async (req, res) => {
  try {
    const body = req.body;
    const legs = req.body.legs;
    console.log("legs", req.body.legs); // Assuming 'legs' is part of the request body
    await db.connectDb();
    const keys = await ZerodhaBroker.findOne({ user: body.user });
    console.log("keys", keys);
    const kite = new KiteConnect({
      api_key: keys.apiKey,
    });
    kite.setAccessToken(keys.accessToken);

    // const getInstrumentPrice = async (instrumentSymbol) => {
    //   try {
    //     const instruments = await kite.getInstruments();
    //     const instrument = instruments.find(
    //       (inst) => inst.tradingsymbol === instrumentSymbol
    //     );

    //     if (!instrument) {
    //       throw new Error(`Instrument ${instrumentSymbol} not found`);
    //     }

    //     const quote = await kite.quote([instrument.instrument_token]);
    //     return quote[instrument.instrument_token].last_price;
    //   } catch (err) {
    //     console.error(err);
    //     throw err;
    //   }
    // };

    // const calculateStrikePrice = (currentPrice, offset) => {
    //   return currentPrice + offset;
    // };

    // const createOptionSymbol = (
    //   instrument,
    //   strikePrice,
    //   optionType,
    //   expiryDate
    // ) => {
    //   const year = expiryDate.getFullYear().toString().slice(-2);
    //   const monthNames = [
    //     "January",
    //     "February",
    //     "March",
    //     "April",
    //     "May",
    //     "June",
    //     "July",
    //     "August",
    //     "September",
    //     "October",
    //     "November",
    //     "December",
    //   ];
    //   const currentDate = new Date();
    //   const day = ("0" + expiryDate.getDate()).slice(-2);

    //   return `${instrument.toUpperCase()}${year}${monthNames[
    //     currentDate.getMonth()
    //   ]
    //     .toUpperCase()
    //     .substring(0, 3)}${day}${strikePrice}${optionType}`;
    // };

    // const generateOptionSymbol = async (
    //   instrument,
    //   optionType,
    //   offset,
    //   isMonthlyExpiry
    // ) => {
    //   try {
    //     const currentPrice = await getInstrumentPrice(instrument);
    //     const adjustedStrikePrice = calculateStrikePrice(currentPrice, offset);

    //     const today = new Date();
    //     const expiryDate = isMonthlyExpiry
    //       ? getLastThursdayOfMonth(today)
    //       : getNextThursday(today);

    //     console.log(
    //       "symbol",
    //       createOptionSymbol(
    //         instrument,
    //         adjustedStrikePrice,
    //         optionType,
    //         expiryDate
    //       )
    //     );
    //   } catch (err) {
    //     console.error(err);
    //     return null;
    //   }
    // };

    // console.log("log", generateOptionSymbol("NIFTY 50", "CE", 50, false));
    // Function to place an order for a single leg
    
    const getLastThursdayOfMonth = (date) => {
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      return new Date(
        lastDay.setDate(lastDay.getDate() - ((lastDay.getDay() + 3) % 7))
      );
    };

    const createOptionSymbol = (
      instrument,
      optionType,
      strikePrice,
      expiryDate
    ) => {
      const year = new Date().getFullYear().toString().slice(-2);
      const month = ("0" + (new Date().getMonth() + 1)).slice(-2);
      const months = [
        "J",
        "F",
        "M",
        "A",
        "M",
        "J",
        "J",
        "A",
        "S",
        "O",
        "N",
        "D",
      ];
      const day = ("0" + new Date().getDate()).slice(-2);
      return `${instrument.toUpperCase()}${year}${months[month-1]}1420950${optionType.toUpperCase()}`
    };
    const placeOrderForLeg = async (leg) => {
      const orderDetails = {
        exchange: "NFO",
        tradingsymbol: createOptionSymbol(
          leg.instrument,
          leg.instrumentType,
          20950,
          14
        ),
        transaction_type: "BUY", // or "SELL" depending on your strategy
        quantity: leg.quantity * 50, // The number of contracts you wish to buy/sell
        order_type: "MARKET", // or "LIMIT" if you want to specify a price
        product: "MIS", // or "MIS" for intraday trades, "CNC" for equities
      };

      return await kite.placeOrder("regular", orderDetails);
    };

    // Placing orders for each leg
    const orderResponses = await Promise.all(
      legs.map((leg) => placeOrderForLeg(leg))
    );

    // Sending back the response
    res.status(200).json(orderResponses);
    db.disconnectDb();
  } catch (error) {
    res.status(500).json({ error: error.message });
    db.disconnectDb();
  }
});

export default router.handler();
