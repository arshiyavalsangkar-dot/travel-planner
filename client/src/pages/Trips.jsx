import axios from "axios";
import { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaWallet,
  FaUsers,
  FaStickyNote,
  FaPlus,
  FaPlaneDeparture,
  FaGlobeAsia,
  FaSuitcaseRolling,
  FaSearch,
} from "react-icons/fa";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

import { useLanguage } from "../context/LanguageContext";

import "./Trips.css";

function Trips() {
  const { language } = useLanguage();

  // ================= STATE =================

  const [form, setForm] = useState({
    destination: "",
    country: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelers: "",
    notes: "",
  });

  const [trips, setTrips] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // ================= TRANSLATIONS =================

  const translations = {
    English: {
      smartTravelPlanner: "Smart Travel Planner",
      exploreTheWorld: "Explore The World",
      oneTripAtATime: "One Trip At A Time",
      heroDescription:
        "Create memorable journeys, organize your travel plans, manage your budget and keep everything in one beautiful place.",
      createTrip: "Create Trip",
      discoverPlaces: "Discover Places",

      totalTrips: "Total Trips",
      totalBudget: "Total Budget",
      countries: "Countries",
      travelers: "Travelers",

      updateTrip: "Update Trip",
      createNewJourney: "Create New Journey",
      formDescription:
        "Fill in your travel details and start planning your dream vacation.",

      destination: "Destination",
      country: "Country",
      estimatedBudget: "Estimated Budget",
      travelersPlaceholder: "Travelers",
      travelNotes: "Write your travel notes...",

      yourJourneyCollection: "Your Journey Collection",
      myTrips: "My Trips",
      manageTrips:
        "Manage all your upcoming adventures in one place.",

      noTripsPlanned: "No Trips Planned Yet",
      firstTrip:
        "Create your first trip to start your journey.",

      noNotes: "No notes",
      edit: "Edit",
      delete: "Delete",

      nextAdventure: "Your Next Adventure Starts Here",
      ctaDescription:
        "Plan smarter, travel better and keep everything organized in one place.",
      startExploring: "Start Exploring",

      pleaseDestination: "Please enter destination",
      pleaseStartDate: "Please select start date",
      pleaseEndDate: "Please select end date",
      invalidDates: "End date cannot be before start date",
      validBudget: "Please enter a valid budget",
      travelersRequired: "Please enter number of travelers",
      saveFailed: "Failed to save trip",

      upcoming: "Upcoming",
    },

    Hindi: {
      smartTravelPlanner: "स्मार्ट ट्रैवल प्लानर",
      exploreTheWorld: "दुनिया का अन्वेषण करें",
      oneTripAtATime: "एक समय में एक यात्रा",
      heroDescription:
        "यादगार यात्राएँ बनाएं, अपनी यात्रा योजनाओं को व्यवस्थित करें, बजट प्रबंधित करें और सब कुछ एक सुंदर जगह पर रखें।",
      createTrip: "यात्रा बनाएं",
      discoverPlaces: "स्थान खोजें",

      totalTrips: "कुल यात्राएँ",
      totalBudget: "कुल बजट",
      countries: "देश",
      travelers: "यात्री",

      updateTrip: "यात्रा अपडेट करें",
      createNewJourney: "नई यात्रा बनाएं",
      formDescription:
        "अपनी यात्रा की जानकारी भरें और अपनी सपनों की छुट्टी की योजना बनाना शुरू करें।",

      destination: "गंतव्य",
      country: "देश",
      estimatedBudget: "अनुमानित बजट",
      travelersPlaceholder: "यात्री",
      travelNotes: "अपनी यात्रा के नोट्स लिखें...",

      yourJourneyCollection: "आपका यात्रा संग्रह",
      myTrips: "मेरी यात्राएँ",
      manageTrips:
        "अपनी सभी आगामी यात्राओं को एक ही जगह पर प्रबंधित करें।",

      noTripsPlanned: "अभी तक कोई यात्रा योजनाबद्ध नहीं",
      firstTrip:
        "अपनी यात्रा शुरू करने के लिए पहली यात्रा बनाएं।",

      noNotes: "कोई नोट्स नहीं",
      edit: "संपादित करें",
      delete: "हटाएँ",

      nextAdventure: "आपका अगला रोमांच यहाँ से शुरू होता है",
      ctaDescription:
        "स्मार्ट तरीके से योजना बनाएं, बेहतर यात्रा करें और सब कुछ एक ही जगह व्यवस्थित रखें।",
      startExploring: "खोज शुरू करें",

      pleaseDestination: "कृपया गंतव्य दर्ज करें",
      pleaseStartDate: "कृपया प्रारंभ तिथि चुनें",
      pleaseEndDate: "कृपया समाप्ति तिथि चुनें",
      invalidDates: "समाप्ति तिथि प्रारंभ तिथि से पहले नहीं हो सकती",
      validBudget: "कृपया सही बजट दर्ज करें",
      travelersRequired: "कृपया यात्रियों की संख्या दर्ज करें",
      saveFailed: "यात्रा सहेजने में विफल",

      upcoming: "आगामी",
    },

    Marathi: {
      smartTravelPlanner: "स्मार्ट ट्रॅव्हल प्लॅनर",
      exploreTheWorld: "जगाचा शोध घ्या",
      oneTripAtATime: "एका वेळी एक सहल",
      heroDescription:
        "स्मरणीय सहली तयार करा, तुमच्या प्रवासाचे नियोजन व्यवस्थित करा, बजेट व्यवस्थापित करा आणि सर्व काही एका सुंदर ठिकाणी ठेवा.",
      createTrip: "सहल तयार करा",
      discoverPlaces: "ठिकाणे शोधा",

      totalTrips: "एकूण सहली",
      totalBudget: "एकूण बजेट",
      countries: "देश",
      travelers: "प्रवासी",

      updateTrip: "सहल अपडेट करा",
      createNewJourney: "नवीन प्रवास तयार करा",
      formDescription:
        "तुमच्या प्रवासाची माहिती भरा आणि तुमच्या स्वप्नातील सुट्टीचे नियोजन सुरू करा.",

      destination: "गंतव्य",
      country: "देश",
      estimatedBudget: "अंदाजे बजेट",
      travelersPlaceholder: "प्रवासी",
      travelNotes: "तुमच्या प्रवासाच्या नोंदी लिहा...",

      yourJourneyCollection: "तुमचा प्रवास संग्रह",
      myTrips: "माझ्या सहली",
      manageTrips:
        "तुमच्या सर्व आगामी सहली एकाच ठिकाणी व्यवस्थापित करा.",

      noTripsPlanned: "अद्याप कोणतीही सहल नियोजित नाही",
      firstTrip:
        "तुमचा प्रवास सुरू करण्यासाठी तुमची पहिली सहल तयार करा.",

      noNotes: "नोट्स नाहीत",
      edit: "संपादित करा",
      delete: "हटवा",

      nextAdventure: "तुमचा पुढील साहसाचा प्रवास येथे सुरू होतो",
      ctaDescription:
        "स्मार्ट पद्धतीने नियोजन करा, उत्तम प्रवास करा आणि सर्व काही एकाच ठिकाणी व्यवस्थित ठेवा.",
      startExploring: "शोध सुरू करा",

      pleaseDestination: "कृपया गंतव्याचे नाव भरा",
      pleaseStartDate: "कृपया प्रारंभ तारीख निवडा",
      pleaseEndDate: "कृपया समाप्ती तारीख निवडा",
      invalidDates:
        "समाप्ती तारीख प्रारंभ तारखेपूर्वी असू शकत नाही",
      validBudget: "कृपया योग्य बजेट भरा",
      travelersRequired: "कृपया प्रवाशांची संख्या भरा",
      saveFailed: "सहल जतन करण्यात अयशस्वी",

      upcoming: "आगामी",
    },
  };

  const text =
    translations[language] || translations.English;

  // ================= LOAD TRIPS =================

  useEffect(() => {
    fetchTrips();
  }, []);

  // ================= FETCH TRIPS =================

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
        setTrips(res.data.trips);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= EDIT TRIP =================

  const editTrip = (trip) => {
    setEditingId(trip._id);

    setForm({
      destination: trip.destination,
      country: trip.country || "",
      startDate: trip.startDate
        ? trip.startDate.split("T")[0]
        : "",
      endDate: trip.endDate
        ? trip.endDate.split("T")[0]
        : "",
      budget: trip.budget,
      travelers: trip.travelers,
      notes: trip.notes || "",
    });
  };

  // ================= ADD / UPDATE TRIP =================

  const addTrip = async (e) => {
    e.preventDefault();

    if (!form.destination.trim()) {
      alert(text.pleaseDestination);
      return;
    }

    if (!form.startDate) {
      alert(text.pleaseStartDate);
      return;
    }

    if (!form.endDate) {
      alert(text.pleaseEndDate);
      return;
    }

    if (new Date(form.endDate) < new Date(form.startDate)) {
      alert(text.invalidDates);
      return;
    }

    if (!form.budget || Number(form.budget) <= 0) {
      alert(text.validBudget);
      return;
    }

    if (!form.travelers || Number(form.travelers) <= 0) {
      alert(text.travelersRequired);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      let res;

      if (editingId) {
        res = await axios.put(
          `http://localhost:5000/api/trips/${editingId}`,
          {
            destination: form.destination,
            country: form.country,
            startDate: form.startDate,
            endDate: form.endDate,
            budget: form.budget,
            travelers: form.travelers,
            notes: form.notes,
            status: "Upcoming",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        res = await axios.post(
          "http://localhost:5000/api/trips",
          {
            destination: form.destination,
            country: form.country,
            startDate: form.startDate,
            endDate: form.endDate,
            budget: form.budget,
            travelers: form.travelers,
            notes: form.notes,
            status: "Upcoming",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      if (res.data.success) {
        fetchTrips();

        setForm({
          destination: "",
          country: "",
          startDate: "",
          endDate: "",
          budget: "",
          travelers: "",
          notes: "",
        });

        setEditingId(null);
      }
    } catch (error) {
      console.error(error);
      alert(text.saveFailed);
    }
  };

  // ================= DELETE TRIP =================

  const deleteTrip = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/trips/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTrips();
    } catch (error) {
      console.error(error);
    }
  };

  // ================= DATE FORMAT =================

  const formatDate = (date) => {
    if (!date) return "";

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

  return (
    <>
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="trips-page">

          {/* Hero Section */}

          <div className="trip-hero">
            <div className="hero-left">

              <span className="hero-tag">
                <FaPlaneDeparture />
                {text.smartTravelPlanner}
              </span>

              <h1>
                {text.exploreTheWorld}
                <br />
                {text.oneTripAtATime}
              </h1>

              <p>
                {text.heroDescription}
              </p>

              <div className="hero-buttons">

                <button
                  className="primary-btn"
                  onClick={() =>
                    document
                      .querySelector(".trip-form-card")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                >
                  <FaPlus />
                  {text.createTrip}
                </button>

                <button
                  className="secondary-btn"
                  onClick={() =>
                    document
                      .querySelector(".my-trips-section")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                >
                  <FaSearch />
                  {text.discoverPlaces}
                </button>

              </div>

            </div>
          </div>

          {/* Statistics */}

          <div className="trip-stats">

            <div className="stat-card">
              <FaSuitcaseRolling />

              <div>
                <h2>{trips.length}</h2>
                <p>{text.totalTrips}</p>
              </div>
            </div>

            <div className="stat-card">
              <FaWallet />

              <div>
                <h2>
                  ₹
                  {trips
                    .reduce(
                      (sum, trip) =>
                        sum +
                        Number(trip.budget || 0),
                      0
                    )
                    .toLocaleString("en-IN")}
                </h2>

                <p>{text.totalBudget}</p>
              </div>
            </div>

            <div className="stat-card">
              <FaMapMarkerAlt />

              <div>
                <h2>
                  {
                    new Set(
                      trips
                        .map((trip) => trip.country)
                        .filter(Boolean)
                    ).size
                  }
                </h2>

                <p>{text.countries}</p>
              </div>
            </div>

            <div className="stat-card">
              <FaUsers />

              <div>
                <h2>
                  {trips.reduce(
                    (sum, trip) =>
                      sum +
                      Number(trip.travelers || 0),
                    0
                  )}
                </h2>

                <p>{text.travelers}</p>
              </div>
            </div>

          </div>

          {/* Add Trip Form */}

          <div className="trip-content single-column">

            <div className="trip-form-card">

              <div className="card-title">
                <h2>
                  <FaPlus />

                  {editingId
                    ? text.updateTrip
                    : text.createNewJourney}
                </h2>

                <p>
                  {text.formDescription}
                </p>
              </div>

              <form
                className="trip-form"
                onSubmit={addTrip}
              >

                <div className="form-grid">

                  <div className="input-group">
                    <FaMapMarkerAlt />

                    <input
                      type="text"
                      name="destination"
                      placeholder={text.destination}
                      value={form.destination}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <FaGlobeAsia />

                    <input
                      type="text"
                      name="country"
                      placeholder={text.country}
                      value={form.country}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group">
                    <FaCalendarAlt />

                    <input
                      type="date"
                      name="startDate"
                      value={form.startDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group">
                    <FaCalendarAlt />

                    <input
                      type="date"
                      name="endDate"
                      value={form.endDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group">
                    <FaWallet />

                    <input
                      type="number"
                      name="budget"
                      placeholder={text.estimatedBudget}
                      value={form.budget}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group">
                    <FaUsers />

                    <input
                      type="number"
                      name="travelers"
                      placeholder={text.travelersPlaceholder}
                      value={form.travelers}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                <div className="input-group textarea-group">
                  

                  <textarea
                    rows="5"
                    name="notes"
                    placeholder={text.travelNotes}
                    value={form.notes}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="add-trip-btn"
                >
                  <FaPlus />

                  {editingId
                    ? text.updateTrip
                    : text.createTrip}
                </button>

              </form>

            </div>
          </div>

          {/* My Trips Section */}

          <div className="my-trips-section">

            <div className="section-header">

              <div>

                <span className="section-tag">
                  {text.yourJourneyCollection}
                </span>

                <h2>{text.myTrips}</h2>

                <p>
                  {text.manageTrips}
                </p>

              </div>

            </div>

            {trips.length === 0 ? (

              <div className="empty-state">

                <div className="empty-icon">
                  ✈️
                </div>

                <h2>
                  {text.noTripsPlanned}
                </h2>

                <p>
                  {text.firstTrip}
                </p>

              </div>

            ) : (

              <div className="trip-grid">

                {trips.map((trip) => (

                  <div
                    className="trip-card"
                    key={trip._id}
                  >

                    <div className="trip-image">

                      <span className="trip-badge">
                        {language === "Hindi"
                          ? "आगामी"
                          : language === "Marathi"
                          ? "आगामी"
                          : trip.status}
                      </span>

                    </div>

                    <div className="trip-content-box">

                      <h3>
                        {trip.destination}
                      </h3>

                      <p>
                        <FaMapMarkerAlt />
                        {" "}
                        {trip.country ||
                          text.country}
                      </p>

                      <p>
                        <FaCalendarAlt />
                        {" "}
                        {formatDate(
                          trip.startDate
                        )}
                        {" - "}
                        {formatDate(
                          trip.endDate
                        )}
                      </p>

                      <p>
                        <FaWallet />
                        {" "}
                        ₹{" "}
                        {Number(
                          trip.budget || 0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                      <p>
                        <FaUsers />
                        {" "}
                        {trip.travelers}{" "}
                        {text.travelers}
                      </p>

                      <p>
                        <FaStickyNote />
                        {" "}
                        {trip.notes ||
                          text.noNotes}
                      </p>

                      <div className="trip-actions">

                        <button
                          className="details-btn"
                          onClick={() =>
                            editTrip(trip)
                          }
                        >
                          {text.edit}
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteTrip(trip._id)
                          }
                        >
                          {text.delete}
                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>
            )}

          </div>

          {/* Bottom CTA */}

          <div className="travel-cta">

            <div className="cta-content">

              <h2>
                {text.nextAdventure}
              </h2>

              <p>
                {text.ctaDescription}
              </p>

              <button
                className="cta-btn"
                onClick={() =>
                  document
                    .querySelector(".trip-form-card")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                <FaPlaneDeparture />
                {text.startExploring}
              </button>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Trips;