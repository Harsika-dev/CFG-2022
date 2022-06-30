const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  city: String,
  name: String,
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "doctor",
  },
  password: String,
  hasRequested: {
    type: Boolean,
    default: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
