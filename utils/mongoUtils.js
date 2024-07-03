const mongoURI = "mongodb://localhost:27017/travel-planner"; // local server
const mongoose = require("mongoose");
const connectMongoDBServer = async () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("mongoDB connected");
      //   mongoose.disconnect();
    })
    .catch((err) => {
      console.log("some error", e);
    });
};

module.exports = { connectMongoDBServer };
