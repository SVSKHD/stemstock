import mongoose from 'mongoose';
import User from './user';

const { Schema } = mongoose;

const StrategySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  legs: [
    {
      symbol: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      orderType: {
        type: String,
        required: true,
        enum: ['market', 'limit'],
      },
      // Other strategy leg details...
    },
  ],
  execution: {
    type: String,
    enum: ['manual', 'auto'],
    required: true,
  },
  // Other strategy fields...
});

const Strategy = mongoose.model('Strategy', StrategySchema);

export default Strategy;
