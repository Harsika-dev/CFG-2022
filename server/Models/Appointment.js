const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  PatientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  DoctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  Day: {
    type: String,
    required: true,
  },
  startHour: {
    type: String,
    required: true,
  },
  endHour: {
    type: String,
    required: true,
  },
  Accepted: {
    type: Boolean,
    default: false,
  },
  Status: {
    type: Boolean,
    default: false,
  },
  checked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);

// Accepted -> Whether the appointment is accepted or not by the doctor
