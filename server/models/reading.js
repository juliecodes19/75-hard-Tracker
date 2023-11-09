const mongoose = require("../db");
const Schema = mongoose.Schema;

const ReadingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookTitle: {
      type: String,
    },
    startPage: {
      type: Number,
    },
    endPage: {
      type: Number,
    },

    notes: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

const Reading = mongoose.model("reading", ReadingSchema);
module.exports = Reading;
