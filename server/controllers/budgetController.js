const Budget = require("../models/Budget");

// =====================================================
// HELPER - VALIDATE BUDGET DATA
// =====================================================

const validateBudgetData = ({
  tripName,
  currency,
  total,
  accommodation,
  food,
  transport,
  shopping,
  activities,
  other,
}) => {
  if (!tripName || !tripName.trim()) {
    return "Trip Name is required";
  }

  if (!currency || !currency.trim()) {
    return "Currency is required";
  }

  const totalAmount = Number(total);

  if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
    return "Total budget must be greater than 0";
  }

  const categories = {
    accommodation,
    food,
    transport,
    shopping,
    activities,
    other,
  };

  let categoryTotal = 0;

  for (const [key, value] of Object.entries(categories)) {
    const amount = Number(value || 0);

    if (!Number.isFinite(amount) || amount < 0) {
      return `${key} cannot be negative or invalid`;
    }

    categoryTotal += amount;
  }

  if (categoryTotal > totalAmount) {
    return "Category expenses cannot be greater than total budget";
  }

  return null;
};


// =====================================================
// CREATE BUDGET
// =====================================================

const createBudget = async (req, res) => {
  try {
    const {
      tripName,
      currency,
      total,
      accommodation,
      food,
      transport,
      shopping,
      activities,
      other,
    } = req.body;

    // Validation
    const validationError = validateBudgetData({
      tripName,
      currency,
      total,
      accommodation,
      food,
      transport,
      shopping,
      activities,
      other,
    });

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const budget = await Budget.create({
      user: req.user.id,
      tripName: tripName.trim(),
      currency: currency.trim(),
      total: Number(total),

      accommodation: Number(accommodation || 0),
      food: Number(food || 0),
      transport: Number(transport || 0),
      shopping: Number(shopping || 0),
      activities: Number(activities || 0),
      other: Number(other || 0),
    });

    res.status(201).json({
      success: true,
      message: "Budget created successfully",
      budget,
    });

  } catch (error) {
    console.error("Create Budget Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// =====================================================
// GET ALL BUDGETS
// =====================================================

const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: budgets.length,
      budgets,
    });

  } catch (error) {
    console.error("Get Budgets Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// =====================================================
// GET SINGLE BUDGET
// =====================================================

const getBudgetById = async (req, res) => {
  try {
    const budget = await Budget.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    res.status(200).json({
      success: true,
      budget,
    });

  } catch (error) {
    console.error("Get Budget Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// =====================================================
// UPDATE BUDGET
// =====================================================

const updateBudget = async (req, res) => {
  try {

    // Find budget belonging to logged-in user
    const budget = await Budget.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    // Only allow budget fields to be updated
    const {
      tripName,
      currency,
      total,
      accommodation,
      food,
      transport,
      shopping,
      activities,
      other,
    } = req.body;

    // Validation
    const validationError = validateBudgetData({
      tripName,
      currency,
      total,
      accommodation,
      food,
      transport,
      shopping,
      activities,
      other,
    });

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    // Update only allowed fields
    budget.tripName = tripName.trim();
    budget.currency = currency.trim();
    budget.total = Number(total);

    budget.accommodation = Number(accommodation || 0);
    budget.food = Number(food || 0);
    budget.transport = Number(transport || 0);
    budget.shopping = Number(shopping || 0);
    budget.activities = Number(activities || 0);
    budget.other = Number(other || 0);

    const updatedBudget = await budget.save();

    res.status(200).json({
      success: true,
      message: "Budget updated successfully",
      budget: updatedBudget,
    });

  } catch (error) {
    console.error("Update Budget Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// =====================================================
// DELETE BUDGET
// =====================================================

const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    await Budget.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Budget deleted successfully",
    });

  } catch (error) {
    console.error("Delete Budget Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
};