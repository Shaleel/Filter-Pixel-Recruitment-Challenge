const express = require("express");
const { signup, googleAuth } = require("../controllers/auth");
const router = express.Router();

router.post("/signup", signup);
router.post("/google-auth", googleAuth);

module.exports = router;
