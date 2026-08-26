const express = require("express");
const router = express.Router();

const protect = require("../auth/authMiddleware");

const {
  createItinerary,
  getItineraries,
  getItineraryById,
  updateItinerary,
  deleteItinerary,
} = require("../controllers/itineraryController");

// Get All Itinerary Activities
router.get("/", protect, getItineraries);

// Get Single Itinerary Activity
router.get("/:id", protect, getItineraryById);

// Create Itinerary Activity
router.post("/", protect, createItinerary);

// Update Itinerary Activity
router.put("/:id", protect, updateItinerary);

// Delete Itinerary Activity
router.delete("/:id", protect, deleteItinerary);

module.exports = router;