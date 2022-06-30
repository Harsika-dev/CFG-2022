const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "patient",
  },
  name: String,
  //   Age: Number,
  phone: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("Patient", patientSchema);
