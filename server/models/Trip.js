const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      default: "",
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    travelers: {
      type: Number,
      default: 1,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["Upcoming", "Completed", "Cancelled"],
      default: "Upcoming",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", tripSchema);