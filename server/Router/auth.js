const express = require("express");
const router = express.Router();
const {
  registerUser1,
  authenticatePatient,
} = require("../Controllers/controllers");

router.post("/signup", registerUser1);
router.post("/signin", authenticatePatient);

module.exports = router;
