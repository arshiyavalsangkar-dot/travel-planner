const Itinerary = require("../models/Itinerary");

// Create Itinerary Activity
const createItinerary = async (req, res) => {
  try {
    const {
      day,
      date,
      time,
      activity,
      location,
      notes,
    } = req.body;

    if (!day || !date || !time || !activity) {
      return res.status(400).json({
        success: false,
        message: "Day, date, time and activity are required",
      });
    }

    const itinerary = await Itinerary.create({
      user: req.user.id,
      day,
      date,
      time,
      activity,
      location,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Itinerary activity created successfully",
      itinerary,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Itinerary Activities
const getItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({
      user: req.user.id,
    }).sort({
      day: 1,
      date: 1,
      time: 1,
    });

    res.status(200).json({
      success: true,
      count: itineraries.length,
      itineraries,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Single Itinerary Activity
const getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: "Itinerary activity not found",
      });
    }

    res.status(200).json({
      success: true,
      itinerary,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Itinerary Activity
const updateItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: "Itinerary activity not found",
      });
    }

    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Itinerary activity updated successfully",
      itinerary: updatedItinerary,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Itinerary Activity
const deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: "Itinerary activity not found",
      });
    }

    await Itinerary.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Itinerary activity deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createItinerary,
  getItineraries,
  getItineraryById,
  updateItinerary,
  deleteItinerary,
};