require("dotenv").config();
const mongoURI = process.env.MONGO_URL; // local server
const mongoose = require("mongoose");
const connectMongoDBServer = async () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("mongoDB connected");
      //   mongoose.disconnect();
    })
    .catch((err) => {
      console.log("some error", err);
    });
};

module.exports = { connectMongoDBServer };
