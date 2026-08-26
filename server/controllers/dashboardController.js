const Trip = require("../models/Trip");

// Dashboard Stats
const getDashboard = async (req, res) => {
  try {
    // Get all trips of logged-in user
    const trips = await Trip.find({
      user: req.user.id,
    });

    // Total Trips
    const totalTrips = trips.length;

    // Upcoming Trips
    const upcomingTrips = trips.filter(
      (trip) => trip.status === "Upcoming"
    ).length;

    // Completed Trips
    const completedTrips = trips.filter(
      (trip) => trip.status === "Completed"
    ).length;

    // Total Budget
    const totalBudget = trips.reduce(
      (sum, trip) => sum + trip.budget,
      0
    );

    res.status(200).json({
      success: true,
      dashboard: {
        totalTrips,
        upcomingTrips,
        completedTrips,
        totalBudget,
      },
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
  getDashboard,
};