const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tripName: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Accommodation",
        "Food",
        "Transport",
        "Shopping",
        "Activities",
        "Other",
      ],
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      required: true,
      trim: true,
      default: "INR",
    },

    date: {
      type: Date,
      required: true,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);