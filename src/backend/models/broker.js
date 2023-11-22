


import mongoose from "mongoose";

const brokerSchema = new mongoose.Schema({
  BrokerName: {
    type: String,
    required: true,
    unique: true,  // Ensures BrokerName is unique across the collection
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  apikeys: [
    {
      name: { type: String },
      value: { type: String },
    },
  ],
});

const Broker = mongoose.models.Broker || mongoose.model("Broker", brokerSchema);

export default Broker;
