const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ============================
    // ENGLISH
    // ============================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    bestTime: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    // ============================
    // HINDI
    // ============================

    nameHindi: {
      type: String,
      default: "",
    },

    countryHindi: {
      type: String,
      default: "",
    },

    bestTimeHindi: {
      type: String,
      default: "",
    },

    descriptionHindi: {
      type: String,
      default: "",
    },

    // ============================
    // MARATHI
    // ============================

    nameMarathi: {
      type: String,
      default: "",
    },

    countryMarathi: {
      type: String,
      default: "",
    },

    bestTimeMarathi: {
      type: String,
      default: "",
    },

    descriptionMarathi: {
      type: String,
      default: "",
    },

    // ============================
    // OTHER
    // ============================

    image: {
      type: String,
      default: "",
    },

    budget: {
      type: String,
      default: "",
    },

    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Destination",
  destinationSchema
);