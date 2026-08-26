const Trip = require("../models/Trip");

// Create Trip
const createTrip = async (req, res) => {
  try {
    const {
  destination,
  country,
  startDate,
  endDate,
  budget,
  travelers,
  notes,
  status,
} = req.body;

    const trip = await Trip.create({
  user: req.user.id,
  destination,
  country,
  startDate,
  endDate,
  budget,
  travelers,
  notes,
  status,
});

    res.status(201).json({
      success: true,
      message: "Trip created successfully",
      trip,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Trips
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: trips.length,
      trips,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Single Trip
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    res.status(200).json({
      success: true,
      trip,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Trip
const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Trip updated successfully",
      trip: updatedTrip,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Delete Trip
const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    await Trip.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Trip deleted successfully",
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
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
};