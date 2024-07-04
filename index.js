const express = require("express");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 3000 || process.env.PORT;

const TripRouter = require("./routes/trips");
const UserRouter = require("./routes/user");
const MongoUtils = require("./utils/mongoUtils");
const hashUtils = require("./utils/passwordHasher");
// const { createToken, verifyToken } = require("./utils/jwt");
// mongoDB
MongoUtils.connectMongoDBServer();
const User = require("./models/user");

// Middlewares

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(TripRouter);
app.use(UserRouter);

app.get("/testing", (req, res) => {
  res.send("Working");
});

// for testing purposes
app.get("/travel-items/:id", (req, res) => {
  const { id } = req.params;
  res.send(id);
});

app.get("/data", (req, res) => {
  res.json({ item: "some crucial info" });
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
