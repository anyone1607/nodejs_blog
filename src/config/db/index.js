const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/exe201_dev");
    console.log("Connected to MongoDB");
  } catch (error) {
    connectionError(error);
  }
}

module.exports = { connect };
