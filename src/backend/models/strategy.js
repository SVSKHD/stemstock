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
