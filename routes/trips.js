const express = require("express");
const { verifyToken } = require("../utils/jwt");
const Trip = require("../models/trip");
const User = require("../models/user");
const { verify } = require("jsonwebtoken");

const router = express.Router();
router.get("/", verifyToken, (req, res) => {
  res.send("landing page");
});

const findUserById = async (id) => {
  return await User.findById({ _id: id });
};

// Secure Routes
router.post("/add-travel", verifyToken, async (req, res) => {
  try {
    const decoded = verify(req.cookies["access-token"], "useaenvkey");
    // const username = decoded.username;
    // const {start, destination, startDate, endDate, modeOfTravel, activities, notes, bookmarked} = req.body;
    const user = await findUserById(decoded.id);
    const tripObject = new Trip(req.body);
    await tripObject.save();
    user.trips.push(tripObject);
    await user.save();
    res.json("Success");
  } catch (e) {
    res.status(400).json({ error: e.message });
  }

  // item.trips.append;
  // res.json();
});

// display all items of user
router.get("/list-travel", verifyToken, async (req, res) => {
  try {
    console.log("access-token", req.cookies["access-token"]);
    const decoded = verify(req.cookies["access-token"], "useaenvkey");
    // populate is used to access

    const user = await User.findById({ _id: decoded.id }).populate("trips");

    if (!user) {
      return res.status(400).json({ error: "User Load Failed" });
    }

    console.log(user.trips);
    return res.send(user.trips);
  } catch (e) {
    res.status(400).json({ error: e.message });
    console.log(e);
  }
});

router.post("/add-trips", async (req, res) => {
  const item = new Trip({
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

  await item.save(); // save to the database
  res.json({ something: true });
});

router.post("/edit-details", (req, res) => {});

router.put("/update-details", (req, res) => {});

router.delete("/delete-details", (req, res) => {
  const { _id } = req.body;
});

module.exports = router;
