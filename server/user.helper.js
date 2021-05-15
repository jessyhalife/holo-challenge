const User = require("./models/user.js");

const userPaginatedResults = () => {
  console.log("aca?")
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 4;

    return Promise.all([
      User.find().sort({ _id: 1 }).limit(limit).exec(),
      User.countDocuments(),
    ])
      .then((data) => {
        console.log(data)
        res.results = data[0];
        res.total = data[1];
        res.page = page;
        next();
      })
      .catch((err) => {
        return res.status(500).json({ message: "error !" });
      });
  };
};

module.exports = userPaginatedResults;
