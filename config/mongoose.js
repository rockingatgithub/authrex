const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/authrex_dev", {
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting to db"));

db.once("open", function () {
  console.log("Connected to database :: MongoDB");
});

module.exports = db;
