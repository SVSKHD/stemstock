import mongoose from "mongoose";

const brokerSchema = new mongoose.Schema({
  BrokerName: {
    type: String,
    required: true,
    unique: true, // Ensures BrokerName is unique across the collection
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  clientId: {
    type: String,
    unique: true,
  },
  apikeys: [
    {
      name: { type: String, unique: true },
      value: { type: String , unique:true},
    },
  ],
});

const Broker = mongoose.models.Broker || mongoose.model("Broker", brokerSchema);

export default Broker;
