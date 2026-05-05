<<<<<<< HEAD
const { Labour } = require("../models");

/* ==============================
   ADD LABOUR
============================== */
=======
const Labour = require("../models/labour.model");

// ADD LABOUR
>>>>>>> 78e9583c7956c4b4b9af980d8c6e7133c70fcc21
exports.addLabour = async (req, res) => {
  try {
    const { name, wage } = req.body;

    if (!name || !wage) {
      return res.status(400).json({
<<<<<<< HEAD
        success: false,
=======
>>>>>>> 78e9583c7956c4b4b9af980d8c6e7133c70fcc21
        message: "Name and wage are required",
      });
    }

<<<<<<< HEAD
    if (wage <= 0) {
      return res.status(400).json({
        success: false,
        message: "Wage must be greater than 0",
      });
    }

    const newLabour = await Labour.create({ name, wage });

    return res.status(201).json({
      success: true,
=======
    const newLabour = await Labour.create({ name, wage });

    res.status(201).json({
>>>>>>> 78e9583c7956c4b4b9af980d8c6e7133c70fcc21
      message: "Labour added successfully",
      data: newLabour,
    });

  } catch (error) {
<<<<<<< HEAD
    console.error("Add Labour Error:", error);
    return res.status(500).json({
      success: false,
=======
    res.status(500).json({
>>>>>>> 78e9583c7956c4b4b9af980d8c6e7133c70fcc21
      message: "Server error",
      error: error.message,
    });
  }
};


<<<<<<< HEAD
/* ==============================
   GET ALL LABOURS
============================== */
exports.getLabours = async (req, res) => {
  try {
    const labours = await Labour.findAll({
      order: [["id", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Labours fetched successfully",
=======
// GET ALL LABOURS
exports.getLabours = async (req, res) => {
  try {

    const labours = await Labour.findAll();

    res.json({
      message: "Labours fetched",
>>>>>>> 78e9583c7956c4b4b9af980d8c6e7133c70fcc21
      data: labours,
    });

  } catch (error) {
<<<<<<< HEAD
    console.error("Get Labour Error:", error);
    return res.status(500).json({
      success: false,
=======
    res.status(500).json({
>>>>>>> 78e9583c7956c4b4b9af980d8c6e7133c70fcc21
      message: "Server error",
      error: error.message,
    });
  }
};


<<<<<<< HEAD
/* ==============================
   UPDATE LABOUR (FIXED)
============================== */
exports.updateLabour = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, wage } = req.body;

    console.log("Updating Labour ID:", id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Labour ID is required",
      });
    }

    const labour = await Labour.findByPk(id);

    if (!labour) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    if (wage !== undefined && wage <= 0) {
      return res.status(400).json({
        success: false,
        message: "Wage must be greater than 0",
      });
    }

    await labour.update({
      name: name ?? labour.name,
      wage: wage ?? labour.wage,
    });

    return res.status(200).json({
      success: true,
      message: "Worker updated successfully",
      data: labour,
    });

  } catch (error) {
    console.error("Update Labour Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


/* ==============================
   DELETE LABOUR (FIXED)
============================== */
exports.deleteLabour = async (req, res) => {
  try {
    const id = req.params.id;

    console.log("Deleting Labour ID:", id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Labour ID is required",
      });
    }

    const labour = await Labour.findByPk(id);

    if (!labour) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    await labour.destroy();

    return res.status(200).json({
      success: true,
      message: "Worker deleted successfully",
    });

  } catch (error) {
    console.error("Delete Labour Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
=======
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
>>>>>>> 78e9583c7956c4b4b9af980d8c6e7133c70fcc21
    });
  }
};