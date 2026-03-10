const mongoose = require("mongoose");

const labourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    wage: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Labour", labourSchema);