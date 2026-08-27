const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");
const profileRoutes = require("./routes/profileRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const packingRoutes = require("./routes/packingRoutes");
const noteRoutes = require("./routes/noteRoutes");
const destinationRoutes = require("./routes/destinationRoutes");

const protect = require("./auth/authMiddleware");

const app = express();

// ===============================
// ENV
// ===============================

console.log("Mongo URI:", process.env.MONGODB_URI);

// ===============================
// DATABASE
// ===============================

connectDB();

// ===============================
// CORS
// ===============================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://travel-planner-9mxw-d1o2v0l02-travel-planner11.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked CORS Origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// ===============================
// BODY PARSER
// ===============================

app.use(express.json());

// ===============================
// ROUTES
// ===============================

app.use("/api/auth", authRoutes);

app.use("/api/trips", tripRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/itinerary", itineraryRoutes);

app.use("/api/budgets", budgetRoutes);

app.use("/api/expenses", expenseRoutes);

app.use("/api/packing", packingRoutes);

app.use("/api/notes", noteRoutes);

app.use("/api/destinations", destinationRoutes);

// ===============================
// HOME / TEST ROUTE
// ===============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Travel Planner Backend Running Successfully",
  });
});

// ===============================
// PROTECTED TEST ROUTE
// ===============================

app.get(
  "/api/profile/test",
  protect,
  (req, res) => {
    res.status(200).json({
      success: true,
      message:
        "Welcome! You have accessed a protected route.",
      user: req.user,
    });
  }
);

// ===============================
// ERROR HANDLER
// ===============================

app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "CORS origin not allowed",
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ===============================
// SERVER
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}`
  );
});