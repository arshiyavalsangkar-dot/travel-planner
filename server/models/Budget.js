const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
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

    currency: {
      type: String,
      required: true,
      trim: true,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    accommodation: {
      type: Number,
      default: 0,
      min: 0,
    },

    food: {
      type: Number,
      default: 0,
      min: 0,
    },

    transport: {
      type: Number,
      default: 0,
      min: 0,
    },

    shopping: {
      type: Number,
      default: 0,
      min: 0,
    },

    activities: {
      type: Number,
      default: 0,
      min: 0,
    },

    other: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Budget", budgetSchema);