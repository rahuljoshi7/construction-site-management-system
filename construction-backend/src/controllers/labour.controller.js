const Labour = require("../models/labour.model");

// ADD LABOUR
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


// GET ALL LABOURS
exports.getLabours = async (req, res) => {
  try {

    const labours = await Labour.findAll();

    res.json({
      message: "Labours fetched",
      data: labours,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// DELETE LABOUR
exports.deleteLabour = async (req, res) => {
  try {

    const id = req.params.id;

    const deleted = await Labour.destroy({
      where: { id }
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Worker not found"
      });
    }

    res.json({
      message: "Worker deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// UPDATE LABOUR
exports.updateLabour = async (req, res) => {
  try {

    const { name, wage } = req.body;
    const id = req.params.id;

    const [updated] = await Labour.update(
      { name, wage },
      { where: { id } }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Worker not found"
      });
    }

    // fetch updated record
    const updatedLabour = await Labour.findByPk(id);

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