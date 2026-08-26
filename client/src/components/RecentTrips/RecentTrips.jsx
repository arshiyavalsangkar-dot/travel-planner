import { useEffect, useState } from "react";
import axios from "axios";
import "./RecentTrips.css";

export default function RecentTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  );

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem("language") || "English");
    };

    window.addEventListener("languageChanged", handleLanguageChange);

    return () => {
      window.removeEventListener("languageChanged", handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/trips",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          const upcomingTrips = res.data.trips
            .filter((trip) => trip.status === "Upcoming")
            .slice(0, 3);

          setTrips(upcomingTrips);
        }
      } catch (error) {
        console.error("Error fetching recent trips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const formatDate = (date) => {
    const locale =
      language === "Hindi"
        ? "hi-IN"
        : language === "Marathi"
        ? "mr-IN"
        : "en-GB";

    return new Date(date).toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const translations = {
    English: {
      title: "Upcoming Trips",
      loading: "Loading trips...",
      empty: "No upcoming trips",
    },
    Hindi: {
      title: "आगामी यात्राएँ",
      loading: "यात्राएँ लोड हो रही हैं...",
      empty: "कोई आगामी यात्रा नहीं है",
    },
    Marathi: {
      title: "आगामी सहली",
      loading: "सहली लोड होत आहेत...",
      empty: "कोणतीही आगामी सहल नाही",
    },
  };

  const text = translations[language] || translations.English;

  return (
    <div className="recent-card">
      <h3>{text.title}</h3>

      {loading ? (
        <p>{text.loading}</p>
      ) : trips.length === 0 ? (
        <p>{text.empty}</p>
      ) : (
        trips.map((trip) => (
          <div className="trip" key={trip._id}>
            <div>
              <h4>{trip.destination}</h4>

              <small>{formatDate(trip.startDate)}</small>
            </div>

            <strong>
              ₹{Number(trip.budget).toLocaleString("en-IN")}
            </strong>
          </div>
        ))
      )}
    </div>
  );
}