const express = require("express");
const router = express.Router();

const { login, signin, signout } = require("../controllers/authController.js");

router.post("/login", login);

module.exports = router;
