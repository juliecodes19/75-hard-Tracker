const mongoose = require("../db");
const Schema = mongoose.Schema;

const WaterSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quantity: {
    type: String,
  },

  notes: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Water = mongoose.model("water", WaterSchema);
module.exports = Water;
