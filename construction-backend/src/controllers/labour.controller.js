const Labour = require("../models/labour.model");

exports.addLabour = async (req, res) => {
  try {
    const { name, wage } = req.body;

    if (!name || !wage) {
      return res.status(400).json({
        message: "Name and wage are required",
      });
    }

    const newLabour = await Labour.create({ name, wage });

    res.status(201).json({
      message: "Labour added successfully",
      data: newLabour,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getLabours = async (req, res) => {
  try {
    const labours = await Labour.find();

    res.json({
      message: "Labours fetched",
      data: labours,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.deleteLabour = async (req, res) => {
  try {

    const labour = await Labour.findByIdAndDelete(req.params.id);

    if (!labour) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.json({
      message: "Worker deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }
};

// UPDATE LABOUR
exports.updateLabour = async (req, res) => {

  try {

    const { name, wage, role } = req.body;

    const updatedLabour = await Labour.findByIdAndUpdate(
      req.params.id,
      {
        name,
        wage,
        role
      },
      { new: true }
    );

    if (!updatedLabour) {
      return res.status(404).json({
        message: "Worker not found"
      });
    }

    res.status(200).json({
      message: "Worker updated successfully",
      data: updatedLabour
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

};