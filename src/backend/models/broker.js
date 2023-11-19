import mongoose from "mongoose";

const brokerSchema = new mongoose.Schema({
  BrokerName: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  apikeys: [
    {
      keyName: { type: String },
      KeyValue: { type: String },
    },
  ],
});

const Broker = mongoose.models.Broker || mongoose.model("Broker", brokerSchema);

export default Broker;




