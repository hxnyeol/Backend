const mongoURI =
  "mongodb+srv://dev:dev123@chat-cluster.shsepp2.mongodb.net/travel-planner"; // local server
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
