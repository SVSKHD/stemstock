import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  brokerName: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled', 'Failed'], // Enum for predefined status values
    required: true
  },
  strategyId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming strategyId refers to another document in the database
    ref: 'Strategy', // Replace with the actual reference model name
    required: true
  }
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
