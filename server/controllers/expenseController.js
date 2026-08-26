const Expense = require("../models/Expense");

// Create Expense
const createExpense = async (req, res) => {
  try {
    const {
      tripName,
      title,
      category,
      amount,
      currency,
      date,
      notes,
    } = req.body;

    // Validation
    if (
      !tripName ||
      !title ||
      !category ||
      amount === undefined ||
      amount === "" ||
      !currency ||
      !date
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Trip Name, Title, Category, Amount, Currency and Date are required",
      });
    }

    const expense = await Expense.create({
      user: req.user.id,
      tripName,
      title,
      category,
      amount,
      currency,
      date,
      notes: notes || "",
    });

    res.status(201).json({
      success: true,
      message: "Expense created successfully",
      expense,
    });
  } catch (error) {
    console.error("Create Expense Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// Get All Expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id,
    }).sort({ date: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: expenses.length,
      expenses,
    });
  } catch (error) {
    console.error("Get Expenses Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// Get Single Expense
const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      expense,
    });
  } catch (error) {
    console.error("Get Expense Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// Update Expense
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    const updatedExpense = await Expense.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    console.error("Update Expense Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// Delete Expense
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error("Delete Expense Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};