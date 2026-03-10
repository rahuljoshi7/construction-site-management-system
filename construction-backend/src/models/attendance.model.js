const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

  labour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Labour",
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },

  shift: {
    type: String,
    enum: ["morning", "evening", "night"],
    required: true
  },

  status: {
    type: String,
    enum: ["present", "absent", "half-day"],
    default: "present"
  },

  overtimeHours: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);