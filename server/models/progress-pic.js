const mongoose = require("../db");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
  },
  imgUrl: {
    type: String, // Store the URL to the image file
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.model("image", ImageSchema);
module.exports = Image;
