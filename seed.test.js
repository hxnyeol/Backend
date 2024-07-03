const { connectMongoDBServer } = require("./utils/mongoUtils");
const userModel = require("./models/user");
const tripModel = require("./models/trip");

const createNewUser = async (username = "tester") => {
  const user = await userModel.findOne({ username });
  const item = new tripModel({
    destination: "Paris, France",
    startDate: new Date("2024-08-15"),
    endDate: new Date("2024-08-22"),
    modeOfTravel: "Plane",
    activities: [
      "Visit Eiffel Tower",
      "Explore Louvre Museum",
      "Seine River Cruise",
      "Enjoy French cuisine",
    ],
    notes:
      "Pack comfortable shoes for walking tours. Try to learn some basic French phrases.",
    bookmarked: false,
  });

  await item.save();
  user.trips.push(item);
  await user.save();
};

connectMongoDBServer().then(() => {
  createNewUser();
});
