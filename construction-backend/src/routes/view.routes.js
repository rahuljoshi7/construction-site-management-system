const express = require("express");
const router = express.Router();

const Labour = require("../models/labour.model");

/* =========================================
   EJS DEMO ROUTES
========================================= */

// Dashboard View
router.get("/dashboard-view", async (req, res) => {
  const labours = await Labour.findAll();

  res.render("dashboard", {
    title: "Dashboard",
    totalLabours: labours.length
  });
});

// Labour List View
router.get("/labours-view", async (req, res) => {
  const labours = await Labour.findAll();

  res.render("labours", {
    title: "Labour List",
    labours
  });
});

module.exports = router;