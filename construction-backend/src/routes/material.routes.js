const express = require("express");
const router = express.Router();

const materialController = require("../controllers/material.controller");

const {
  verifyToken,
  authorizeRoles
} = require("../middleware/auth.middleware");

/*
-----------------------------------
ADD MATERIAL (Admin only)
-----------------------------------
*/
router.post(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  materialController.addMaterial
);

/*
-----------------------------------
UPDATE MATERIAL (Admin only)
-----------------------------------
*/
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  materialController.updateMaterial
);

/*
-----------------------------------
DELETE MATERIAL (Admin only)
-----------------------------------
*/
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  materialController.deleteMaterial
);

/*
-----------------------------------
GET ALL MATERIALS (Admin + Supervisor)
-----------------------------------
*/
router.get(
  "/",
  verifyToken,
  authorizeRoles("admin", "supervisor"),
  materialController.getMaterials
);

module.exports = router;