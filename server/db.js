const mongoose = require("mongoose");
const { config } = require("./config.js");
const User = require("./models/user.js");

mongoose.connect(config.mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// db.once("open", () => {
//   User.remove().then(() => console.log("removed successful"));
// });

// db.once("open", async () => {
//   Promise.all([
//     User.create({ email: "1", username: "User 1", password: "pass1234" }),
//     User.create({ email: "2", username: "User 2", password: "pass1234" }),
//     User.create({ email: "3", username: "User 3", password: "pass1234" }),
//     User.create({ email: "4", username: "User 4", password: "pass1234" }),
//     User.create({ email: "5", username: "User 5", password: "pass1234" }),
//     User.create({ email: "6", username: "User 6", password: "pass1234" }),
//     User.create({ email: "7", username: "User 7", password: "pass1234" }),
//     User.create({ email: "8", username: "User 8", password: "pass1234" }),
//     User.create({ email: "9", username: "User 9", password: "pass1234" }),
//     User.create({ email: "1", username: "User 10", password: "pass1234" }),
//     User.create({ email: "1", username: "User 11", password: "pass1234" }),
//     User.create({ email: "1", username: "User 12", password: "pass1234" }),
//   ]).then(() => console.log("Added All Users"));
// });

db.on("error", (error) => {
  console.log(error);
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

module.exports = db;
