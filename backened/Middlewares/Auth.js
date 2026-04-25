const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.json({ success: false, message: "No token provided" });
  }

  const token = auth.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.json({ success: false, message: "Invalid token" });
  }
};

module.exports = ensureAuthenticated;