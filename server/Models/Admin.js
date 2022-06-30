const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: String,
  City: String,
  phone: String,
  email: String,
  name: String,
  usertype: {
    type: String,
    default: "admin",
  },
  password: String,
});

module.exports = mongoose.model("Admin", adminSchema);
