import mongoose from "mongoose";

const legSchema = new mongoose.Schema({
  instrument: String,
  instrumentType: String,
  entry_type: { type: String, default: "time" },
  expiry: { type: String, default: "current" },
  index: Number,
  segment: String,
  // strike tyep and value
  strikeType: String,
  strikeValue: String,
  strikeClosestValue: Number,
  // position buy and sell
  position: String,
  // lot size
  quantity: String,
  // take profit
  takeProfit: Boolean,
  takeProfitType: String,
  takeProfitValue: Number,
  // stoploss
  stopLoss: Boolean,
  stopLossType: String,
  stopLossValue: Number,
  // trail stop loss
  trialStopLoss: Boolean,
  trialStopLossType: String,
  trialStopLossValue: { x: String, y: String },
  // wait and trade
  waitAndTrade: Boolean,
  waitAndTradeType: String,
  waitAndTradeValue: Number,
  //rentry
  reEntry: Boolean,
  reEntryType: String,
  reEntryValue: Number,
});

const StrategySchema = new mongoose.Schema({
  name: String,
  entryTime: String,
  endTime: String,
  immediate: Boolean,
  legs: [legSchema],
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
  status: Boolean,
  // overAllStopLoss
  overAllStopLossType: String,
  overAllStopLossValue: Number,
  // overAllMTMTYpe
  overAllMTMType: String,
  overAllMTMValue: Number,
  // stoplossrentry
  stopLossReEntry: Boolean,
  stopLossReEntryValue: Number,
  // target rentry
  targetReEntry: Boolean,
  targetReEntryValue: Number,
  status: Boolean,
  user: mongoose.Schema.Types.ObjectId,
});

const Strategy =
  mongoose.models.Strategy || mongoose.model("Strategy", StrategySchema);

export default Strategy;
