const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // English
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Hindi
    titleHindi: {
      type: String,
      default: "",
      trim: true,
    },

    descriptionHindi: {
      type: String,
      default: "",
      trim: true,
    },

    // Marathi
    titleMarathi: {
      type: String,
      default: "",
      trim: true,
    },

    descriptionMarathi: {
      type: String,
      default: "",
      trim: true,
    },

    category: {
      type: String,
      default: "General",
      trim: true,
    },

    important: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);