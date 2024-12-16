import mongoose from "mongoose";

const TarotReadingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cards: { type: Array },
  quote: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("TarotReading", TarotReadingSchema);
