import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

import { useLanguage } from "../context/LanguageContext";

import {
  FaGlobe,
  FaPlus,
  FaMapMarkerAlt,
  FaImage,
  FaCalendarAlt,
  FaWallet,
  FaStar,
  FaTrash,
  FaPlaneDeparture,
} from "react-icons/fa";

import "./Destinations.css";

export default function Destinations() {
  const { t, language } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    country: "",
    image: "",
    bestTime: "",
    budget: "",
    description: "",
  });

  const [destinations, setDestinations] = useState([]);
  const [adding, setAdding] = useState(false);

  // ============================
  // GET TOKEN
  // ============================

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("authToken")
    );
  };

  // ============================
  // FETCH DESTINATIONS
  // ============================

  const fetchDestinations = async () => {
    try {
      const token = getToken();

      if (!token) {
        console.error("Token not found");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/destinations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDestinations(
        response.data.destinations || []
      );
    } catch (error) {
      console.error(
        "Fetch Destinations Error:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // ============================
  // HANDLE FORM
  // ============================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ============================
  // ADD DESTINATION
  // ============================

  const addDestination = async (e) => {
    e.preventDefault();

    if (adding) {
      return;
    }

    if (!form.name.trim()) {
      alert(t("enterDestinationName"));
      return;
    }

    if (!form.country.trim()) {
      alert(t("enterCountry"));
      return;
    }

    try {
      setAdding(true);

      const token = getToken();

      if (!token) {
        alert(t("pleaseLogin"));
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/destinations",
        {
          name: form.name.trim(),
          country: form.country.trim(),
          image: form.image.trim(),
          bestTime: form.bestTime.trim(),
          budget: form.budget.trim(),
          description: form.description.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newDestination =
        response.data.destination;

      setDestinations((prev) => [
        newDestination,
        ...prev,
      ]);

      setForm({
        name: "",
        country: "",
        image: "",
        bestTime: "",
        budget: "",
        description: "",
      });

      alert(
        t("destinationAddedSuccessfully")
      );
    } catch (error) {
      console.error(
        "Add Destination Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          t("failedAddDestination")
      );
    } finally {
      setAdding(false);
    }
  };

  // ============================
  // GET TRANSLATED DATA
  // ============================

  const getDestinationText = (
    place,
    field
  ) => {
    if (language === "Hindi") {
      return (
        place[`${field}Hindi`] ||
        place[field] ||
        ""
      );
    }

    if (language === "Marathi") {
      return (
        place[`${field}Marathi`] ||
        place[field] ||
        ""
      );
    }

    return place[field] || "";
  };

  // ============================
  // TOGGLE FAVORITE
  // ============================

  const toggleFavorite = async (
    id,
    currentStatus
  ) => {
    try {
      const token = getToken();

      if (!token) {
        alert(t("pleaseLogin"));
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/destinations/${id}`,
        {
          favorite: !currentStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDestinations((prev) =>
        prev.map((place) =>
          place._id === id
            ? response.data.destination
            : place
        )
      );
    } catch (error) {
      console.error(
        "Update Destination Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          t("failedUpdateDestination")
      );
    }
  };

  // ============================
  // DELETE DESTINATION
  // ============================

  const deleteDestination = async (id) => {
    const confirmDelete = window.confirm(
      t("confirmDeleteDestination")
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = getToken();

      if (!token) {
        alert(t("pleaseLogin"));
        return;
      }

      await axios.delete(
        `http://localhost:5000/api/destinations/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDestinations((prev) =>
        prev.filter(
          (place) => place._id !== id
        )
      );

      alert(
        t("destinationDeletedSuccessfully")
      );
    } catch (error) {
      console.error(
        "Delete Destination Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          t("failedDeleteDestination")
      );
    }
  };

  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <div className="destinations-page">

          {/* ============================
              HERO
          ============================ */}

          <div className="destination-hero">

            <div className="destination-hero-left">

              <div className="hero-tag">
                <FaGlobe />
                {t("destinationExplorer")}
              </div>

              <h1>
                {t("discoverAmazingPlacesTitle")}
              </h1>

              <p>
                {t("destinationDescription")}
              </p>

            </div>

            <div className="destination-hero-right">
              <FaPlaneDeparture />
            </div>

          </div>


          {/* ============================
              ADD DESTINATION
          ============================ */}

          <div className="destination-form-card">

            <div className="card-title">

              <h2>
                <FaPlus />
                {t("addDestinationTitle")}
              </h2>

              <p>
                {t("createDestinationList")}
              </p>

            </div>


            <form
              className="destination-form"
              onSubmit={addDestination}
            >

              <div className="form-grid">

                {/* NAME */}

                <div className="input-group">

                  <FaMapMarkerAlt />

                  <input
                    type="text"
                    name="name"
                    placeholder={t(
                      "destinationName"
                    )}
                    value={form.name}
                    onChange={handleChange}
                  />

                </div>


                {/* COUNTRY */}

                <div className="input-group">

                  <FaGlobe />

                  <input
                    type="text"
                    name="country"
                    placeholder={t(
                      "country"
                    )}
                    value={form.country}
                    onChange={handleChange}
                  />

                </div>


                {/* IMAGE */}

                <div className="input-group">

                  <FaImage />

                  <input
                    type="text"
                    name="image"
                    placeholder={t(
                      "imageUrl"
                    )}
                    value={form.image}
                    onChange={handleChange}
                  />

                </div>


                {/* BEST TIME */}

                <div className="input-group">

                  <FaCalendarAlt />

                  <input
                    type="text"
                    name="bestTime"
                    placeholder={t(
                      "bestTime"
                    )}
                    value={form.bestTime}
                    onChange={handleChange}
                  />

                </div>


                {/* BUDGET */}

                <div className="input-group">

                  <FaWallet />

                  <input
                    type="text"
                    name="budget"
                    placeholder={t(
                      "budgetRange"
                    )}
                    value={form.budget}
                    onChange={handleChange}
                  />

                </div>

              </div>


              {/* DESCRIPTION */}

              <div className="textarea-box">

                <textarea
                  name="description"
                  placeholder={t(
                    "destinationDescriptionPlaceholder"
                  )}
                  value={form.description}
                  onChange={handleChange}
                />

              </div>


              {/* ADD BUTTON */}

              <button
                type="submit"
                className="add-destination-btn"
                disabled={adding}
              >

                <FaPlus />

                {adding
                  ? t("addingDestination")
                  : t("addDestination")}

              </button>

            </form>

          </div>


          {/* ============================
              DESTINATION LIST
          ============================ */}

          <div className="destination-list-section">

            <div className="section-header">

              <span className="section-tag">
                {t("myDestinations")}
              </span>

              <h2>
                {t("savedDestinations")}
              </h2>

              <p>
                {t("manageDestinations")}
              </p>

            </div>


            {destinations.length === 0 ? (

              <div className="empty-destinations">

                <FaGlobe className="empty-icon" />

                <h2>
                  {t(
                    "noDestinationsAdded"
                  )}
                </h2>

                <p>
                  {t(
                    "startAddingDestinations"
                  )}
                </p>

              </div>

            ) : (

              <div className="destination-grid">

                {destinations.map(
                  (place) => {

                    const placeId =
                      place._id ||
                      place.id;

                    const name =
                      getDestinationText(
                        place,
                        "name"
                      );

                    const country =
                      getDestinationText(
                        place,
                        "country"
                      );

                    const bestTime =
                      getDestinationText(
                        place,
                        "bestTime"
                      );

                    const description =
                      getDestinationText(
                        place,
                        "description"
                      );

                    return (

                      <div
                        className={`destination-card ${
                          place.favorite
                            ? "favorite"
                            : ""
                        }`}
                        key={placeId}
                      >

                        {/* IMAGE */}

                        {place.image && (

                          <img
                            src={place.image}
                            alt={name}
                            className="destination-image"
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                          />

                        )}


                        <div className="destination-content">

                          {/* HEADER */}

                          <div className="destination-card-header">

                            <div>

                              <h3>
                                {name}
                              </h3>

                              <span>
                                {country}
                              </span>

                            </div>


                            {/* FAVORITE */}

                            <FaStar
                              className={
                                place.favorite
                                  ? "star-active"
                                  : "star"
                              }
                              onClick={() =>
                                toggleFavorite(
                                  placeId,
                                  place.favorite
                                )
                              }
                            />

                          </div>


                          {/* DETAILS */}

                          <div className="destination-details">

                            <p>
                              📅{" "}
                              <strong>
                                {t(
                                  "bestTimeLabel"
                                )}
                              </strong>{" "}
                              {bestTime ||
                                t(
                                  "notAdded"
                                )}
                            </p>


                            <p>
                              💰{" "}
                              <strong>
                                {t(
                                  "budgetLabel"
                                )}
                              </strong>{" "}
                              {place.budget ||
                                t(
                                  "notAdded"
                                )}
                            </p>


                            <p>
                              📝{" "}
                              {description ||
                                t(
                                  "noDescription"
                                )}
                            </p>

                          </div>


                          {/* DELETE */}

                          <button
                            type="button"
                            className="delete-destination-btn"
                            onClick={() =>
                              deleteDestination(
                                placeId
                              )
                            }
                          >

                            <FaTrash />

                            {t(
                              "deleteDestination"
                            )}

                          </button>

                        </div>

                      </div>

                    );
                  }
                )}

              </div>

            )}

          </div>


          {/* ============================
              CTA
          ============================ */}

          <div className="destination-cta">

            <div className="cta-content">

              <h2>
                {t("readyExploreWorld")}
              </h2>

              <p>
                {t(
                  "destinationCtaDescription"
                )}
              </p>

              <button
                type="button"
                className="cta-btn"
                onClick={() =>
                  document
                    .querySelector(
                      ".destination-form-card"
                    )
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >

                <FaPlaneDeparture />

                {t(
                  "exploreMorePlaces"
                )}

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}