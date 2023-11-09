const mongoose = require("mongoose");
// const DB_PORT = process.env.DB_PORT || 27017;
// const DB_NAME = process.env.DB_NAME || "75Hard";

mongoose.connect("mongodb://127.0.0.1:27017/75Hard");
console.log("🦆 Database (sessions) connected !");
module.exports = mongoose;
