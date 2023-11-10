const mongoose = require("../db");
const Schema = mongoose.Schema;

const DietSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mealType: {
    type: String,
  },
  carbs: {
    type: String,
  },
  proteins: {
    type: String,
  },
  fat: {
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

const Diet = mongoose.model("diet", DietSchema);
module.exports = Diet;
