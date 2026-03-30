const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expense.controller");

const {
  verifyToken,
  authorizeRoles
} = require("../middleware/auth.middleware");

/*
-----------------------------------
ADD EXPENSE (Admin only)
-----------------------------------
*/
router.post(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  expenseController.addExpense
);

/*
-----------------------------------
DELETE EXPENSE (Admin only)
-----------------------------------
*/
router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  expenseController.deleteExpense
);

/*
-----------------------------------
GET ALL EXPENSES (Admin + Supervisor)
-----------------------------------
*/
router.get(
  "/",
  verifyToken,
  authorizeRoles("admin", "supervisor"),
  expenseController.getExpenses
);

module.exports = router;