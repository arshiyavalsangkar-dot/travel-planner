const express = require("express");
const router = express.Router();

const protect = require("../auth/authMiddleware");

const {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
} = require("../controllers/tripController");

// Get All Trips
router.get("/", protect, getTrips);

// Get Single Trip
router.get("/:id", protect, getTripById);

// Create Trip
router.post("/", protect, createTrip);

// Update Trip
router.put("/:id", protect, updateTrip);

// Delete Trip
router.delete("/:id", protect, deleteTrip);

module.exports = router;