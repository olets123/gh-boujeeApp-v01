const mongoose = require("mongoose");

const BoujeeSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  percent: {
    type: Number,
    required: true,
  },
});

const Boujee = mongoose.model("BoujeeData", BoujeeSchema);
module.exports = Boujee;
