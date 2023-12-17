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

    // const getNiftyLTP = async () => {
    //   try {
    //     const instruments = await kite.getInstruments("NSE"); // Fetch instruments from the NSE segment
    //     const niftyInstrument = instruments.find(
    //       (inst) => inst.tradingsymbol === "NIFTY 50"
    //     ); // Replace with the correct symbol for NIFTY 50 Index

    //     if (!niftyInstrument) {
    //       throw new Error("Nifty instrument not found");
    //     }

    //     const quote = await kite.getQuote([niftyInstrument.instrument_token]);
    //     console.log("quote", quote);
    //     return quote[niftyInstrument.instrument_token].last_price;
    //   } catch (err) {
    //     console.error("Error fetching Nifty LTP:", err);
    //     throw err;
    //   }
    // };

    const getIndicesLTP = async (symbols) => {
      try {
        const instruments = await kite.getInstruments("NSE");
        let quotes = {};

        for (let symbol of symbols) {
          // If the symbol is 'NIFTY', replace it with 'NIFTY 50'
          if (symbol === "NIFTY") {
            symbol = "NIFTY 50";
          }

          const instrument = instruments.find(
            (inst) => inst.tradingsymbol === symbol
          );

          if (!instrument) {
            console.error(`Instrument not found for ${symbol}`);
            continue;
          }

          const quote = await kite.getQuote(`NSE:${instrument.tradingsymbol}`);
          quotes[symbol] = quote[`NSE:${instrument.tradingsymbol}`].last_price;
        }

        console.log("Quotes:", quotes);
        return quotes;
      } catch (err) {
        console.error("Error fetching indices LTP:", err);
        throw err;
      }
    };

    const getATMStrikePrice = async (indexSymbol) => {
      try {
        // If the symbol is 'NIFTY', replace it with 'NIFTY 50'
        if (indexSymbol === "NIFTY") {
          indexSymbol = "NIFTY 50";
        }

        // Fetch LTP for the index
        const ltpData = await getIndicesLTP([indexSymbol]);
        const indexLTP = ltpData[indexSymbol];

        if (!indexLTP) {
          throw new Error(`LTP not found for ${indexSymbol}`);
        }

        // Assuming strike prices are in increments of 100 (adjust as needed)
        const strikeIncrement = 100;
        const atmStrike =
          Math.round(indexLTP / strikeIncrement) * strikeIncrement;

        return atmStrike;
      } catch (error) {
        console.error(
          `Error calculating ATM strike for ${indexSymbol}:`,
          error
        );
        throw error;
      }
    };

    // Function to get the ATM strike price
    // const getATMStrikePrice = async (indexSymbol) => {
    //   try {
    //     // Fetch LTP for the specified index
    //     const ltpData = await getIndicesLTP([indexSymbol]);
    //     const indexLTP = ltpData[indexSymbol];

    //     // Validate if LTP is available
    //     if (!indexLTP) {
    //       throw new Error(`LTP not found for ${indexSymbol}`);
    //     }

    //     const optionsInstruments = await kite.getInstruments("NFO"); // Fetch instruments from the NFO segment

    //     // Filter options for the specified index
    //     const indexOptions = optionsInstruments.filter(
    //       (inst) =>
    //         inst.name === indexSymbol.split(" ")[0] &&
    //         inst.segment === "NFO-OPT"
    //     );

    //     // Find the ATM strike
    //     const atmStrike = indexOptions.reduce(
    //       (prev, curr) =>
    //         Math.abs(curr.strike - indexLTP) < Math.abs(prev.strike - indexLTP)
    //           ? curr
    //           : prev,
    //       indexOptions[0]
    //     ).strike;

    //     return atmStrike;
    //   } catch (error) {
    //     console.error(
    //       `Error fetching ATM strike price for ${indexSymbol}:`,
    //       error
    //     );
    //     throw error;
    //   }
    // };

    // Outputs an array of numbers representing the dates of Thursdays
    function getThursdaysOfMonth(year, month) {
      let date = new Date(year, month, 1);
      let thursdays = [];
    
      // Adjust the date to the first Thursday
      while (date.getDay() !== 4) { // 4 is Thursday
        date.setDate(date.getDate() + 1);
      }
    
      // Iterate over all Thursdays in the month
      while (date.getMonth() === month) {
        thursdays.push(new Date(date)); // Add the date to the array
        date.setDate(date.getDate() + 7);
      }
    
      return thursdays;
    }
    
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); // Note: January is 0, December is 11
    
    const thursdaysInMonth = getThursdaysOfMonth(currentYear, currentMonth);
    
    function getNearestUpcomingThursday() {
      let today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to start of the day
    
      // Find the next Thursday from today
      let nextThursday = new Date(today);
      nextThursday.setDate(today.getDate() + (4 - today.getDay() + 7) % 7);
    
      // If today is Thursday, add 7 days to get the next Thursday
      if (today.getDay() === 4) {
        nextThursday.setDate(nextThursday.getDate() + 7);
      }
    
      return nextThursday;
    }
    
    const nearestUpcomingThursday = getNearestUpcomingThursday();
    
    console.log("day", nearestUpcomingThursday); // Outputs the date of the nearest next Thursday
    

    // Outputs the date of the nearest Thursday

    //create option symbol
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

      console.log(
        "instrument",
        `${instrument.toUpperCase()}${year}${
          months[month - 1]
        }${expiryDate}${strikePrice}${optionType.toUpperCase()}`
      );
      return `${instrument.toUpperCase()}${year}${
        months[month - 1]
      }${expiryDate}${strikePrice}${optionType.toUpperCase()}`;
    };

    const BooleanReturns = (data, value) => {
      if (data === true) {
        console.log("stop",value)
      } else {
        return null;
      }
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
        // stoploss: BooleanReturns(leg.stopLoss, parseFloat(leg.stopLossValue)),
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
