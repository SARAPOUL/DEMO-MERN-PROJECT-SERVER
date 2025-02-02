const e = require("express");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (password === process.env.PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ token, username });
  } else {
    return res.status(400).json({ error: "Invalid password" });
  }
};


exports.requireLogin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});