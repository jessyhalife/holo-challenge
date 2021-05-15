const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticateJWT, isAllowed } = require("./middlewares/auth.js");
const { config } = require("./config.js");

//initialize database
require("./db.js");

const User = require("./models/user.js");
const userPaginatedResults = require("./user.helper.js");
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("key", config.key);
app.use(cors());

/**
 * Route serving post-login
 * @param {string} username
 * @param {string} password
 */
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  //if username and password exists, for mocking proposes i wont check login
  //if user equals admin, it would be treated as `admin` user, otherwise it would be treated as non admin user
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
      username: username,
    });
  } else {
    res.status(400).json({ message: "No user or password were provided" });
  }
});

/**
 * Route serving users
 * User must be authenticated
 * recieves from query string page number
 */
app.get("/users", authenticateJWT, userPaginatedResults(), (req, res) => {
  return res.json({ results: res.results, total: res.total, page: res.page });
});

/**
 * Route for creating user
 * User must be authenticated and should be Admin user
 * @param {string} username
 * @param {string} password
 * @param {string} email
 */
app.post("/users", authenticateJWT, isAllowed, (req, res) => {
  console.log(req.body)
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(404).json({ message: "Incomplete data" });

  try {
    const newUser = new User({ username, email, password });

    return newUser
      .save()
      .then((data) => {
        console.log(data)
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
