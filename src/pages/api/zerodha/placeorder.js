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

    const getNiftyLTP = async () => {
      try {
        const instruments = await kite.getInstruments("NSE"); // Fetch instruments from the NSE segment
        const niftyInstrument = instruments.find(
          (inst) => inst.tradingsymbol === "NIFTY 50"
        ); // Replace with the correct symbol for NIFTY 50 Index

        if (!niftyInstrument) {
          throw new Error("Nifty instrument not found");
        }

        const quote = await kite.getQuote([niftyInstrument.instrument_token]);
        console.log("quote", quote);
        return quote[niftyInstrument.instrument_token].last_price;
      } catch (err) {
        console.error("Error fetching Nifty LTP:", err);
        throw err;
      }
    };

    // Function to get the ATM strike price
    const getATMStrikePrice = async () => {
      try {
        const niftyLTP = await getNiftyLTP();
        const optionsInstruments = await kite.getInstruments("NFO"); // Fetch instruments from the NFO segment

        const niftyOptions = optionsInstruments.filter(
          (inst) => inst.name === "NIFTY" && inst.segment === "NFO-OPT"
        );

        const atmStrike = niftyOptions.reduce(
          (prev, curr) =>
            Math.abs(curr.strike - niftyLTP) < Math.abs(prev.strike - niftyLTP)
              ? curr
              : prev,
          niftyOptions[0]
        ).strike;

        return atmStrike;
      } catch (error) {
        console.error("Error fetching ATM strike price:", error);
        throw error;
      }
    };

    // function for dates in month


     // Outputs an array of numbers representing the dates of Thursdays

    const getNearestThursday = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const currentDay = today.getDate();
      let nearestThursday = null;
      let smallestDiff = Infinity;

      // Find the first day of the month
      let date = new Date(year, month, 1);

      // Find the first Thursday in the month
      while (date.getDay() !== 4) {
        date.setDate(date.getDate() + 1);
      }

      // Iterate over all Thursdays in the month
      while (date.getMonth() === month) {
        const thursdayDate = date.getDate();
        const diff = Math.abs(thursdayDate - currentDay);

        if (diff < smallestDiff) {
          smallestDiff = diff;
          nearestThursday = thursdayDate;
        }

        date.setDate(date.getDate() + 7);
      }

      return nearestThursday;
    };

    const nearestThursdayDate = getNearestThursday();
    console.log(nearestThursdayDate); // Outputs the date of the nearest Thursday

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

      console.log(`${instrument.toUpperCase()}${year}${
        months[month - 1]
      }${expiryDate}${strikePrice}${optionType.toUpperCase()}`);
    };

    const AtmLegType = async (leg) => {
      if (leg.strikeType === "ATM Type") {
        let price = getATMStrikePrice(leg.instrument.toUpperCase());
      }
    };

    //placing orders
    const placeOrderForLeg = async (leg) => {
      const atmStrikePrice = await getATMStrikePrice(
        leg.instrument.toUpperCase()
      );
      const orderDetails = {
        exchange: "NFO",
        tradingsymbol: createOptionSymbol(
          leg.instrument,
          leg.instrumentType,
          atmStrikePrice,
          nearestThursdayDate
        ),
        transaction_type: leg.position === "BUY" ? "BUY" : "SELL", // or "SELL" depending on your strategy
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
