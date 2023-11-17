import mongoose from "mongoose";

const LegSchema = new mongoose.Schema({
  instrument: { type: String, required: true },
  segments: { type: String, enum: ["OPT", "FUT"], required: true },
  position: { type: String, enum: ["BUY", "SELL"], required: true },
  optionType: { type: String, enum: ["CE", "PE"], required: true },
  strikeCriteria: { type: String, enum: ["ATM", "ITM", "OTM"], required: true },
  strikeType: { type: String, enum: ["ATM", "ITM", "OTM"], required: true },
  Quantity: { type: Number, required: true },
  target: { type: Number, default: 0 },
  stoploss: { type: Number },
  trailStopLoss: {
    x: {},
    y: {},
  },
  waitAndTrade: { type: Number, default: 0 },
  ReEntry: { type: Number, default: 0 },
});

const StrategySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // This should match the model name you used when you did mongoose.model('User', userSchema)
    required: true,
  },
  strategyName: { type: String, required: true },
  legs: [LegSchema],
  entryTime: { type: String, required: true },
  exitTime: { type: String, required: true },
  overallMTM: {
    stopLoss: { type: String },
    overAllTarget: { type: String },
  },
  daysToExecute: [
    {
      type: String,
      enum: ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
  ],

  enabled: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
  },
  // Additional fields such as stop loss, targets, etc., can be added here
});

const Strategy = mongoose.model("Strategy", StrategySchema);

export default Strategy;

const mongoose = require("mongoose");

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
    required: true,
  },
  broker: {
    type: Boolean,
    default: false,
  },
  brokerSelected: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Broker",
    required: true,
  },
  status: String,
});

// Create a Mongoose model using the schema
const TradingStrategy = mongoose.model(
  "TradingStrategy",
  tradingStrategySchema
);

module.exports = TradingStrategy;
