const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
async function connect() {
  // try {
  //   await mongoose.connect("mongodb://localhost:27017/exe201_dev");
  //   console.log("Connected to MongoDB");
  // } catch (error) {
  //   connectionError(error);
  // }
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connect to MongoDB Success!");
    })
    .catch((error) => {
      console.error(error.message);
      process.exit();
    });
}

module.exports = { connect };
