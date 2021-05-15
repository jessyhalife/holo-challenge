const jwt = require("jsonwebtoken");
const { config } = require("../config.js");
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const [, token] = authHeader.split(" ");
    jwt.verify(token, config.key, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const isAllowed = (req, res, next) => {
  const { admin } = req.user;
  if (!admin) return res.sendStatus(401);

  next();
};

module.exports = {
  authenticateJWT,
  isAllowed,
};
