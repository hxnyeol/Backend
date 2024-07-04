const mongoose = require("mongoose");
const mongoURI = ""; // local server

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

connectMongoDBServer().then(() => {
  console.log("MONGO WORKING");
});
