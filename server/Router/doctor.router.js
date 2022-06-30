const express = require("express");
const router = express.Router();
const { registerUser1 } = require("../Controllers/controllers");
const Doctors = require("../Models/Doctor");

router.get("/:city", async (req, res) => {
  const { city } = req.params;
  console.log(city);
  try {
    const doctorsInCity = await Doctors.find({ city });
    res.status(200).send(doctorsInCity);
  } catch (err) {
    res.status(400).json({ message: "error" });
  }
});

module.exports = router;
