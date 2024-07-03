const { sign, verify } = require("jsonwebtoken");
const Cookies = require("js-cookie");

const createToken = (user) => {
  const accessToken = sign(
    { username: user.username, id: user._id },
    "useaenvkey"
  );
  return accessToken;
};

const verifyToken = (req, res, next) => {
  if (!req.header.authorization) {
    res.status(400).json({ error: "User Not Authenticated" });
  }
  console.log("went through");

  const accessToken = req.headers.authorization.split(" ")[1];
  if (!accessToken) {
    res.status(400).json({ error: "User Not Authenticated" });
  }
  try {
    const valid_token = verify(accessToken, "useaenvkey");
    if (valid_token) {
      req.authenticated = true; // Make sure you inform others
      next();
      return;
    }
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

module.exports = { createToken, verifyToken };
