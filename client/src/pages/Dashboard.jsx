import axios from "axios";
const API_URL = "https://travel-planner-cf3c.onrender.com";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

import TravelChart from "../components/Charts/TravelChart";
import RecentTrips from "../components/RecentTrips/RecentTrips";
import QuickActions from "../components/QuickActions/QuickActions";

import {
  FaPlaneDeparture,
  FaMapMarkerAlt,
  FaWallet,
  FaSuitcaseRolling,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [dashboard, setDashboard] = useState({
    totalTrips: 0,
    upcomingTrips: 0,
    completedTrips: 0,
    totalBudget: 0,
  });

  const [packingCount, setPackingCount] = useState(0);
  const [placesCount, setPlacesCount] = useState(0);
  const [upcomingTrip, setUpcomingTrip] = useState(null);

  // Dashboard data
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${API_URL}/api/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setDashboard(res.data.dashboard);
        }
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      }
    };

    fetchDashboard();
  }, []);

  // Packing items
  useEffect(() => {
    const fetchPackingItems = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${API_URL}/api/packing`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const totalItems = (res.data.items || []).reduce(
          (total, item) =>
            total + (Number(item.quantity) || 1),
          0
        );

        setPackingCount(totalItems);
      } catch (error) {
        console.error(
          "Error fetching packing items:",
          error
        );
      }
    };

    fetchPackingItems();
  }, []);

  // Destinations
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/destinations",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPlacesCount(
          res.data.destinations?.length || 0
        );
      } catch (error) {
        console.error(
          "Error fetching destinations:",
          error
        );
      }
    };

    fetchDestinations();
  }, []);

  // Upcoming trip
  useEffect(() => {
    const fetchUpcomingTrip = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
         `${API_URL}/api/trips`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          const trips = res.data.trips || [];

          const upcoming = trips
            .filter(
              (trip) => trip.status === "Upcoming"
            )
            .sort(
              (a, b) =>
                new Date(a.startDate) -
                new Date(b.startDate)
            );

          setUpcomingTrip(upcoming[0] || null);
        }
      } catch (error) {
        console.error(
          "Error fetching upcoming trip:",
          error
        );
      }
    };

    fetchUpcomingTrip();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <main className="dashboard-page">

          {/* Hero Section */}
          <section className="dashboard-hero">
            <div className="hero-content">

              <div className="hero-badge">
                <FaPlaneDeparture />
                <span>
                  {t("premiumTravelPlanner")}
                </span>
              </div>

              <h1>
                {t("discoverAmazingPlaces")}
                <br />
                {t("aroundTheWorld")}
              </h1>

              <p>
                {t("dashboardDescription")}
              </p>

              <div className="hero-buttons">
                <button
                  className="primary-btn"
                  onClick={() => navigate("/trips")}
                >
                  {t("planNewTrip")}
                </button>

                <button
                  className="secondary-btn"
                  onClick={() =>
                    navigate("/destinations")
                  }
                >
                  {t("exploreDestinations")}
                  <FaArrowRight />
                </button>
              </div>
            </div>

            <div className="hero-image">
              <FaPlaneDeparture />
            </div>
          </section>

          {/* Statistics */}
          <section className="stats-grid">

            <div className="stat-card">
              <FaPlaneDeparture />

              <h3>{t("totalTrips")}</h3>

              <span>
                {dashboard.totalTrips}
              </span>

              <small>
                {dashboard.upcomingTrips}{" "}
                {t("upcoming")} •{" "}
                {dashboard.completedTrips}{" "}
                {t("completed")}
              </small>
            </div>

            <div className="stat-card">
              <FaMapMarkerAlt />

              <h3>{t("places")}</h3>

              <span>{placesCount}</span>

              <small>
                {t("visitedCountries")}
              </small>
            </div>

            <div className="stat-card">
              <FaWallet />

              <h3>{t("totalBudget")}</h3>

              <span>
                ₹
                {Number(
                  dashboard.totalBudget
                ).toLocaleString("en-IN")}
              </span>

              <small>
                {t("overallTripBudget")}
              </small>
            </div>

            <div className="stat-card">
              <FaSuitcaseRolling />

              <h3>{t("packingItems")}</h3>

              <span>{packingCount}</span>

              <small>
                {t("readyToGo")}
              </small>
            </div>

          </section>

          {/* Chart + Recent Trips */}
          <section className="dashboard-grid">

            <div className="dashboard-left">
              <TravelChart />
            </div>

            <div className="dashboard-right">
              <RecentTrips />
            </div>

          </section>

          {/* Quick Actions */}
          <section className="dashboard-section">
            <div className="section-title"></div>

            <QuickActions />
          </section>

          {/* Upcoming Trip */}
          <section className="dashboard-section">

            <div className="section-title">
              <h2>{t("upcomingJourney")}</h2>
            </div>

            <div className="upcoming-card">

              <div className="trip-info">

                {upcomingTrip ? (
                  <>
                    <h3>
                      {upcomingTrip.destination}
                      {upcomingTrip.country
                        ? `, ${upcomingTrip.country}`
                        : ""}
                    </h3>

                    <p>
                      <FaCalendarAlt />

                      <span>
                        {new Date(
                          upcomingTrip.startDate
                        ).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </p>

                    <p>
                      <FaMapMarkerAlt />

                      <span>
                        {upcomingTrip.country ||
                          t("countryNotAdded")}
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <h3>
                      {t("noUpcomingTrip")}
                    </h3>

                    <p>
                      <FaCalendarAlt />

                      <span>
                        {t("planNextJourney")}
                      </span>
                    </p>
                  </>
                )}

              </div>

              <button
                className="trip-btn"
                onClick={() =>
                  navigate("/itinerary")
                }
              >
                {t("viewItinerary")}
              </button>

            </div>
          </section>

          {/* Call To Action */}
          <section className="dashboard-cta">

            <div className="cta-content">

              <h2>
                {t("readyNextAdventure")}
              </h2>

              <p>
                {t("ctaDescription")}
              </p>

              <button
                className="cta-btn"
                onClick={() =>
                  navigate("/trips")
                }
              >
                <FaPlaneDeparture />
                {t("startPlanning")}
              </button>

            </div>
          </section>

          {/* Footer */}
          <footer className="dashboard-footer"></footer>

        </main>
      </div>
    </div>
  );
}