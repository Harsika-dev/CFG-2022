const express = require("express");
const router = express.Router();
const {
  acceptDoctor,
  rejectDoctor,
  showAllAcceptedDoctors,
  showAllVerificationPendingDoctors,
  showAllPatients,
} = require("../Controllers/controllers");

router.post("/acceptDoctor", acceptDoctor);

router.post("/rejectDoctor", rejectDoctor);

router.get("/allAcceptedDoctors", showAllAcceptedDoctors);

router.get("/doctorsToVerify", showAllVerificationPendingDoctors);

router.get("/allPatients", showAllPatients);

module.exports = router;
