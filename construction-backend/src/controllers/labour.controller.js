const { Labour } = require("../models");

/* ==============================
   ADD LABOUR
============================== */
exports.addLabour = async (req, res) => {
  try {
    const { name, wage } = req.body;

    if (!name || !wage) {
      return res.status(400).json({
        success: false,
        message: "Name and wage are required",
      });
    }

    if (wage <= 0) {
      return res.status(400).json({
        success: false,
        message: "Wage must be greater than 0",
      });
    }

    const newLabour = await Labour.create({ name, wage });

    return res.status(201).json({
      success: true,
      message: "Labour added successfully",
      data: newLabour,
    });

  } catch (error) {
    console.error("Add Labour Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


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
      data: labours,
    });

  } catch (error) {
    console.error("Get Labour Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


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
    });
  }
};