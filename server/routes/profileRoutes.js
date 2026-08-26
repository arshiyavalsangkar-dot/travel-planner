const express = require("express");
const router = express.Router();

const protect = require("../auth/authMiddleware");

const {
  getProfile,
  updateProfile,
} = require("../controllers/profileController");

// Get Profile
router.get("/", protect, getProfile);

// Update Profile
router.put("/", protect, updateProfile);

module.exports = router;