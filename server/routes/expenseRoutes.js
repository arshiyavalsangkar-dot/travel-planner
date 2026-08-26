const express = require("express");

const router = express.Router();

const protect = require("../auth/authMiddleware");

const {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

// Get All Expenses
router.get("/", protect, getExpenses);

// Get Single Expense
router.get("/:id", protect, getExpenseById);

// Create Expense
router.post("/", protect, createExpense);

// Update Expense
router.put("/:id", protect, updateExpense);

// Delete Expense
router.delete("/:id", protect, deleteExpense);

module.exports = router;