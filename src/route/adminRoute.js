
const express = require("express");
const { register, login } = require("../controller/adminController");
const router = express.Router();

// admin registration
router.post("/register", register);

// admin login
router.post("/login", login)

module.exports = router;