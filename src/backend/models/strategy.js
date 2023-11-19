import mongoose from "mongoose";

const tradingStrategySchema = new mongoose.Schema({
  name: String,
  entryTime: String, // You might want to use a more appropriate data type like Date
  endTime: String, // You might want to use a more appropriate data type like Date
  immediate: Boolean,
  legs: [
    {
      instrument: String,
      instrumentType: String,
      entry_type: {
        type: String,
        enum: ["time", "other_entry_types"], // Add other valid entry types if needed
        default: "time", // Set a default value if needed
      },
      expiry: {
        type: String,
        enum: ["current", "other_expiry_options"], // Add other valid expiry options if needed
        default: "current", // Set a default value if needed
      },
      index: Number,
      segment: String,
      strike_type: String,
      strike_value: String,
      position: String,
      quantity: String,
      takeProfit: Boolean,
      takeProfitType: String,
      takeProfitValue: Number,
      stopLoss: Boolean,
      stopLossType: String,
      stopLossValue: Number,
      trialStopLoss: Boolean,
      trialStopLossType: Number,
      trialStopLossValue: {
        x: Number,
        y: Number,
      },
      waitAndTrade: Boolean,
      waitAndTradeType: String,
      waitAndTradeValue: Number,
      Recost: Boolean,
      RecostType: String,
      RecostSubType: String,
      RecostValue: String,
      Re_Entry: String,
    },
  ],
  stopLoss: Number, // You can specify the type as 'Number' if it's a currency amount or percentage
  overallMTM: Number, // You can specify the type as 'Number' if it's a currency amount or percentage
  daysToExecute: [
    {
      all: Boolean,
      monday: Boolean,
      tuesday: Boolean,
      wednesday: Boolean,
      thursday: Boolean,
      friday: Boolean,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  broker: {
    type: Boolean,
    default: false,
  },
  // brokerSelected: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Broker",
  // },
  status: String,
});

// Create a Mongoose model using the schema
const Strategy = mongoose.models.Strategy || mongoose.model('Strategy', tradingStrategySchema);

export default Strategy;