const mongoURI =
  "mongodb+srv://dev:dev7896@cluster0.ddockvv.mongodb.net/travel-planner"; // local server
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
