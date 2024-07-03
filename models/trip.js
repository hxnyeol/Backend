const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  start: { type: String, required: true },
  destination: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  modeOfTravel: { type: String, required: true }, // [Road, Train, Plane, Cruise]
  activities: { type: Array, default: [] },
  notes: { type: String, default: "" },
  bookmarked: { type: Boolean, default: false },
});

module.exports = mongoose.model("Trip", tripSchema);
