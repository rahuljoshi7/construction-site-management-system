const Material = require("../models/material.model");

/* =========================================
   ADD MATERIAL
========================================= */

exports.addMaterial = async (req, res) => {
  try {

    const { name, quantity, unit, pricePerUnit } = req.body;

    if (!name || !quantity || !pricePerUnit) {
      return res.status(400).json({
        success: false,
        message: "Name, quantity, and price are required"
      });
    }

    const material = await Material.create({
      name,
      quantity,
      unit,
      pricePerUnit
    });

    res.status(201).json({
      success: true,
      material
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to add material",
      error: error.message
    });

  }
};


/* =========================================
   GET ALL MATERIALS
========================================= */

exports.getMaterials = async (req, res) => {
  try {

    const materials = await Material.findAll({
      order: [["createdAt", "DESC"]]
    });

    res.json({
      success: true,
      data: materials
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch materials",
      error: error.message
    });

  }
};


/* =========================================
   UPDATE MATERIAL
========================================= */

exports.updateMaterial = async (req, res) => {
  try {

    const { id } = req.params;

    const [updated] = await Material.update(
      req.body,
      { where: { id } }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Material not found"
      });
    }

    const updatedMaterial = await Material.findByPk(id);

    res.json({
      success: true,
      material: updatedMaterial
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Update failed",
      error: error.message
    });

  }
};


/* =========================================
   DELETE MATERIAL
========================================= */

exports.deleteMaterial = async (req, res) => {
  try {

    const { id } = req.params;

    const deleted = await Material.destroy({
      where: { id }
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Material not found"
      });
    }

    res.json({
      success: true,
      message: "Material deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Delete failed",
      error: error.message
    });

  }
};