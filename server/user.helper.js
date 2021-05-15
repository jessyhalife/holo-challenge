const User = require("./models/user.js");

const userPaginatedResults = () => {
  console.log("aca?");
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 0;
    const limit = 4;
    console.log(req.query);
    return Promise.all([
      User.find()
        .sort({ _id: "desc" })
        .limit(limit)
        .skip(page * limit)
        .exec(),
      User.countDocuments(),
    ])
      .then((data) => {
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
