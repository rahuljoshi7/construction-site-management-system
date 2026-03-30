const Expense = require("../models/expense.model");

/* =========================================
   ADD EXPENSE
========================================= */

exports.addExpense = async (req, res) => {
  try {

    const { title, amount, category } = req.body;

    if (!title || !amount) {
      return res.status(400).json({
        success: false,
        message: "Title and amount are required"
      });
    }

    const expense = await Expense.create({
      title,
      amount,
      category
    });

    res.status(201).json({
      success: true,
      expense
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to add expense",
      error: error.message
    });

  }
};


/* =========================================
   GET ALL EXPENSES
========================================= */

exports.getExpenses = async (req, res) => {
  try {

    const expenses = await Expense.findAll({
      order: [["createdAt", "DESC"]]
    });

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    res.json({
      success: true,
      data: expenses,
      total
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch expenses",
      error: error.message
    });

  }
};


/* =========================================
   DELETE EXPENSE
========================================= */

exports.deleteExpense = async (req, res) => {
  try {

    const id = req.params.id;

    const deleted = await Expense.destroy({
      where: { id }
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Expense not found"
      });
    }

    res.json({
      success: true,
      message: "Expense deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Delete failed",
      error: error.message
    });

  }
};