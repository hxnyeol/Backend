const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Trip = require("../models/trip");
const { createToken, verifyToken } = require("../utils/jwt");
const hashUtils = require("../utils/passwordHasher");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw new Error("Missing username or password"); // Or handle validation errors differently
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ error: "User Already Exists" });
      // return res.status(409).json({ error: "User Already Exists" });
    }

    const hashed = await hashUtils.hashPassword(password);
    const profile = new User({
      username: username,
      password: hashed,
    });
    await profile.save();

    const access_token = createToken(profile);
    console.log("before cookie");
    // req.header["access-token"]
    res.cookie("access-token", access_token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({ user: profile._id, created: true });
  } catch (err) {
    console.log("error", err);
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const profile = await User.findOne({ username });
    if (!profile) {
      res.status(400).json({ error: "User Not Found" });
    } else {
      const result = await hashUtils.cmpPass(password, profile.password);
      if (result) {
        const access_token = createToken(profile);
        console.log("before cookie");
        // req.header["access-token"]
        res.cookie("access-token", access_token, {
          maxAge: 3 * 24 * 60 * 60 * 1000,
          withCredentials: true,
          httpOnly: false,
        });
        res.status(201).json({ user: profile._id, created: true });
      } else {
        res.status(400).json({ error: "Password Incorrect" });
      }
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get("/profile", verifyToken, (req, res) => {
  res.json("success");
});

module.exports = router;
