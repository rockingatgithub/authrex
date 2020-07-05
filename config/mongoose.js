// ======configure mongoose to fetch data from databse=======

const mongoose = require("mongoose");
const env = require("./environment");
//give db address
mongoose.connect(`mongodb://localhost/${env.db}`, {
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting to db"));

db.once("open", function () {
  console.log("Connected to database :: MongoDB");
});

module.exports = db;
