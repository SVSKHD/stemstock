import mongoose from "mongoose";

const accessSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, unique: true },
  value: { type: String, unique: true },
});

const AccessSchema =
  mongoose.models.AccessSchema ||
  mongoose.model("AccessSchema", accessSchema);

export default AccessSchema;
