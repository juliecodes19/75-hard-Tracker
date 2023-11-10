const mongoose = require("../db");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  session: {
    type: String,
  },
  location: {
    type: String,
  },
  exerciseType: {
    type: String,
  },
  sets: {
    type: Number,
  },
  reps: {
    type: Number,
  },
  notes: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Workout = mongoose.model("workout", WorkoutSchema);
module.exports = Workout;
