const mongoose = require("mongoose");
const tripModel = require("../models/trip");
const Schema = mongoose.Schema;
const userSchema = Schema({
  username: {
    unique: true,
    required: [true, "Username cannot not be empty"],
    type: String,
  },
  password: {
    required: [true, "password cannot not be empty"],
    type: String,
  },

  trips: {
    type: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
  },
});

module.exports = mongoose.model("User", userSchema);
