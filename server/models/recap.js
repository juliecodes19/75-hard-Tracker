const mongoose = require("../db");
const Schema = mongoose.Schema;

const RecapSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  workout: [
    {
      type: Schema.Types.ObjectId,
      ref: "Workout",
    },
  ],
  diet: [
    {
      type: Schema.Types.ObjectId,
      ref: "Diet",
    },
  ],
  image: [
    {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
  water: [
    {
      type: Schema.Types.ObjectId,
      ref: "Water",
    },
  ],
  reading: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reading",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Recap = mongoose.model("recap", RecapSchema);
module.exports = Recap;
