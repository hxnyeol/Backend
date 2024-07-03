const { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
  const accessToken = sign(
    { username: user.username, id: user._id },
    "useaenvkey"
  );
  return accessToken;
};

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(400).json({ error: "User Not Authenticated" });
    return;
  }

  const accessToken = req.headers.authorization.split(" ")[1];
  if (!accessToken) {
    res.status(400).json({ error: "User Not Authenticated" });
    return;
  }
  try {
    const valid_token = verify(accessToken, "useaenvkey");
    if (valid_token) {
      req.authenticated = true;
      req.cookies["access-token"] = accessToken;
      next();
    }
  } catch (e) {
    res.status(400).json({ error: "Authentication Failed" });
  }
};

module.exports = { createToken, verifyToken };
