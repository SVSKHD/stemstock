import mongoose from "mongoose";

const zerodhaBrokerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  clientId: {
    type: String,
    unique: true,
  },
  apiKey: { type: String, unique: true },
  apiSecret: { type: String, unique: true },
  accessToken: { type: String, unique: true },
});

const ZerodhaBroker =
  mongoose.models.ZerodhaBroker ||
  mongoose.model("ZerodhaBroker", zerodhaBrokerSchema);

export default ZerodhaBroker;
