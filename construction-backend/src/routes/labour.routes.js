const express = require("express");
const router = express.Router();

const labourController = require("../controllers/labour.controller");

const {
  verifyToken,
  authorizeRoles
} = require("../middleware/auth.middleware");

/*
-----------------------------------
ADD LABOUR (Admin only)
-----------------------------------
*/
router.post(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  labourController.addLabour
);

/*
-----------------------------------
GET ALL LABOURS (Admin + Supervisor)
-----------------------------------
*/
router.get(
  "/",
  verifyToken,
  authorizeRoles("admin", "supervisor"),
  labourController.getLabours
);

/*
-----------------------------------
UPDATE LABOUR (Admin only)
-----------------------------------
*/
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  labourController.updateLabour
);

/*
-----------------------------------
DELETE LABOUR (Admin only)
-----------------------------------
*/
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  labourController.deleteLabour
);

module.exports = router;