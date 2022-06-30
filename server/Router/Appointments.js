const express = require("express");
const router = express.Router();
const {
  registerUser1,
  authenticatePatient,
  showAllUpcomingAppointments,
  addAppointment,
  acceptAppointment,
  doctorsAppointments,
} = require("../Controllers/controllers");

router.get("/", showAllUpcomingAppointments);
router.post("/", addAppointment);
router.post("/accept", acceptAppointment);
router.get("/pending", showAllUpcomingAppointments);
router.post("/doctor", doctorsAppointments);

module.exports = router;
