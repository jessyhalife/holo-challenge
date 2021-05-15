const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { authenticateJWT, isAllowed } = require("./middlewares/auth.js");
const { config } = require("./config.js");
const db = require("./db.js");
const User = require("./models/user.js");
const userPaginatedResults = require("./user.helper.js");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("key", config.key);
app.use(cors());
app.post("/login", (req, res) => {
  console.log(req.body)
  const { username, password } = req.body;

  if (username && password) {
    const payload = {
      username: username,
      admin: username === "admin",
    };
    const token = jwt.sign(payload, app.get("key"), {
      expiresIn: 1400,
    });
    
    res.status(200).json({
      message: "Authentication successful",
      token,
      admin: username === "admin",
    });
  } else {
    res.status(400).json({ message: "No user or password were provided" });
  }
});

app.get("/users", authenticateJWT, userPaginatedResults(), (req, res) => {
  return res.json({ results: res.results, total: res.total, page: res.page });
});

app.post("/users", authenticateJWT, isAllowed, (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(404).json({ message: "Incomplete data" });

  try {
    const newUser = new User({ username, email, password });

    return newUser
      .save()
      .then((data) => {
        return res.sendStatus(201);
      })
      .catch((error) => {
        return res.status(400).json({ message: error.message });
      });
  } catch (error) {
    console.log(error);
    res.statusCode(400);
  }
});

app.listen(4200, () => {
  console.log("Server listening on port 4200");
});

module.exports = app;
