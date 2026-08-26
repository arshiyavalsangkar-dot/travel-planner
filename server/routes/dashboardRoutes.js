const express = require("express");
const router = express.Router();

const protect = require("../auth/authMiddleware");
const { getDashboard } = require("../controllers/dashboardController");

// Dashboard Route
router.get("/", protect, getDashboard);

module.exports = router;