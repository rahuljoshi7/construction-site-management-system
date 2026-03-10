const express = require("express");
const router = express.Router();

const labourController = require("../controllers/labour.controller");

const {
  verifyToken,
  isAdmin
} = require("../middleware/auth.middleware");

/*
-----------------------------------
ADD LABOUR (Admin only)
-----------------------------------
*/
router.post("/", verifyToken, isAdmin, labourController.addLabour);

/*
-----------------------------------
GET ALL LABOURS
-----------------------------------
*/
router.get("/", verifyToken, labourController.getLabours);

/*
-----------------------------------
UPDATE LABOUR (Admin only)
-----------------------------------
*/
router.put("/:id", verifyToken, isAdmin, labourController.updateLabour);

/*
-----------------------------------
DELETE LABOUR (Admin only)
-----------------------------------
*/
router.delete("/:id", verifyToken, isAdmin, labourController.deleteLabour);

module.exports = router;