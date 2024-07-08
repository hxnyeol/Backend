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
    console.log(decoded);
    console.log(req.body);

    const user = await findUserById(decoded.id);
    console.log(user);
    const tripObject = new Trip(req.body);
    await tripObject.save();
    console.log("1");
    user.trips.push(tripObject);

    await user.save();
    console.log("1");
    res.json("Success");
    return;
  } catch (e) {
    res.status(400).json({ error: e.message });
    return;
  }
});

// display all items of user
router.get("/list-travel", verifyToken, async (req, res) => {
  try {
    console.log("access-token", req.cookies["access-token"]);
    const decoded = verify(req.cookies["access-token"], "useaenvkey");
    // populate is used to access
    console.log(decoded);
    const user = await User.findById({ _id: decoded.id }).populate("trips");

    if (!user) {
      return res.status(400).json({ error: "User Load Failed" });
    }

    console.log(user.trips);
    return res.send(user.trips);
  } catch (e) {
    res.status(400).json({ error: e.message });
    console.log(e);
    return;
  }
});

// remove later
router.post("/myroute", verifyToken, (req, res) => {
  console.log(req.body);
  res.json("done");
  return;
});

router.post("/edit-details/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.json(id);
  return;
});

// handle form update logic
router.put("/update-details", (req, res) => {});

// testing for failure
router.delete("/travel-items/:id", verifyToken, async (req, res) => {
  try {
    console.log("access-token", req.cookies["access-token"]);
    const decoded = verify(req.cookies["access-token"], "useaenvkey");
    console.log(decoded.username);

    // core logic
    const { id } = req.params;
    console.log("to delete", id);
    const profile = await User.findOneAndUpdate(
      { trips: id },
      { $pull: { trips: id } },
      { new: true }
    );
    console.log("debugger", profile);

    if (!profile) {
      res.status(404).json({ error: "the specified User does not exist" });
      return;
    }

    await Trip.findByIdAndDelete(id);
    console.log("debugger", "delete");
    // await session.commitTransaction();
    // session.endSession();
    console.log("debugger", "complete");
    res.json("Successs");
    return;
  } catch (e) {
    res.status(400).json({ error: "Issue in deletion request" });
    return;
  }
});

router.patch("/travel-items/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const tripItem = await Trip.findById(id);
    if (!tripItem) {
      return res.status(404).json({ error: "Trip item not found" });
    }

    tripItem.bookmarked = !tripItem.bookmarked;

    await tripItem.save();
    res.json("Success");
    return;
  } catch (e) {
    res.status(400).json({ error: "Issue in patching request" });
    return;
  }
});

module.exports = router;
