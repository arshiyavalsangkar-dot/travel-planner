const express = require("express");
const router = express.Router();

const protect = require("../auth/authMiddleware");

const {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
} = require("../controllers/budgetController");

// Get All Budgets
router.get("/", protect, getBudgets);

// Get Single Budget
router.get("/:id", protect, getBudgetById);

// Create Budget
router.post("/", protect, createBudget);

// Update Budget
router.put("/:id", protect, updateBudget);

// Delete Budget
router.delete("/:id", protect, deleteBudget);

module.exports = router;