import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaClipboardList,
  FaPlus,
  FaRoute,
  FaPlaneDeparture,
} from "react-icons/fa";

import { useLanguage } from "../context/LanguageContext";

import "./Itinerary.css";

export default function Itinerary() {
  const { language } = useLanguage();

  // ============================
  // TRANSLATIONS
  // ============================

  const translations = {
    English: {
      smartPlanner: "Smart Itinerary Planner",
      organizeEvery: "Organize Every",
      momentTrip: "Moment Of Your Trip",
      heroDescription:
        "Create your own travel schedule, manage activities, keep important notes and never miss an adventure.",
      addActivity: "Add Activity",

      travelTimeline: "Travel Timeline",
      timelineDescription:
        "Keep your complete travel schedule in one beautiful place.",

      addNewActivity: "Add New Activity",
      formDescription:
        "Create your personalized itinerary for every day of your trip.",

      dayNumber: "Day Number",
      activityName: "Activity Name",
      location: "Location",
      additionalNotes: "Additional Notes",

      saving: "Saving...",
      saveActivity: "Save Activity",

      yourPlan: "YOUR PLAN",
      timelineTitle: "Travel Timeline",
      timelineDescription2:
        "View and manage all your planned activities.",

      loadingActivities: "Loading Activities...",
      loadingDescription:
        "Please wait while we load your itinerary.",

      noActivities: "No Activities Yet",
      emptyDescription:
        "Your itinerary is empty. Add your first activity above and start planning your journey.",

      locationNotSpecified: "Location not specified",
      noAdditionalNotes: "No additional notes.",

      day: "Day",
      delete: "Delete",

      ctaTitle:
        "Every Great Journey Begins With A Plan",
      ctaDescription:
        "Organize every destination, activity and memory in one place. A well-planned itinerary makes every trip smoother and more enjoyable.",
      planAdventure: "Plan Your Next Adventure",

      validDay: "Please enter a valid day number.",
      selectDate: "Please select a date.",
      selectTime: "Please select a time.",
      enterActivity: "Please enter activity name.",
      loginAgain: "Please login again.",
      activitySaved: "Activity saved successfully!",
      saveFailed: "Failed to save activity.",
      activityDeleted: "Activity deleted successfully!",
      deleteFailed: "Failed to delete activity.",
    },

    Hindi: {
      smartPlanner: "स्मार्ट यात्रा कार्यक्रम",
      organizeEvery: "अपनी यात्रा के हर",
      momentTrip: "पल को व्यवस्थित करें",
      heroDescription:
        "अपना यात्रा कार्यक्रम बनाएं, गतिविधियों को प्रबंधित करें, महत्वपूर्ण नोट्स रखें और किसी भी रोमांच को न चूकें।",
      addActivity: "गतिविधि जोड़ें",

      travelTimeline: "यात्रा समयरेखा",
      timelineDescription:
        "अपना पूरा यात्रा कार्यक्रम एक सुंदर जगह पर रखें।",

      addNewActivity: "नई गतिविधि जोड़ें",
      formDescription:
        "अपनी यात्रा के हर दिन के लिए व्यक्तिगत यात्रा कार्यक्रम बनाएं।",

      dayNumber: "दिन संख्या",
      activityName: "गतिविधि का नाम",
      location: "स्थान",
      additionalNotes: "अतिरिक्त नोट्स",

      saving: "सहेजा जा रहा है...",
      saveActivity: "गतिविधि सहेजें",

      yourPlan: "आपकी योजना",
      timelineTitle: "यात्रा समयरेखा",
      timelineDescription2:
        "अपनी सभी योजनाबद्ध गतिविधियों को देखें और प्रबंधित करें।",

      loadingActivities: "गतिविधियाँ लोड हो रही हैं...",
      loadingDescription:
        "कृपया प्रतीक्षा करें, आपकी यात्रा योजना लोड हो रही है।",

      noActivities: "अभी कोई गतिविधि नहीं",
      emptyDescription:
        "आपकी यात्रा योजना खाली है। ऊपर अपनी पहली गतिविधि जोड़ें और अपनी यात्रा की योजना शुरू करें।",

      locationNotSpecified: "स्थान निर्दिष्ट नहीं है",
      noAdditionalNotes: "कोई अतिरिक्त नोट्स नहीं।",

      day: "दिन",
      delete: "हटाएँ",

      ctaTitle:
        "हर शानदार यात्रा एक योजना से शुरू होती है",
      ctaDescription:
        "हर गंतव्य, गतिविधि और याद को एक ही जगह व्यवस्थित करें। अच्छी तरह से बनाई गई यात्रा योजना हर यात्रा को आसान और अधिक आनंददायक बनाती है।",
      planAdventure: "अपने अगले रोमांच की योजना बनाएं",

      validDay: "कृपया सही दिन संख्या दर्ज करें।",
      selectDate: "कृपया तारीख चुनें।",
      selectTime: "कृपया समय चुनें।",
      enterActivity: "कृपया गतिविधि का नाम दर्ज करें।",
      loginAgain: "कृपया दोबारा लॉगिन करें।",
      activitySaved: "गतिविधि सफलतापूर्वक सहेजी गई!",
      saveFailed: "गतिविधि सहेजने में विफल।",
      activityDeleted: "गतिविधि सफलतापूर्वक हटाई गई!",
      deleteFailed: "गतिविधि हटाने में विफल।",
    },

    Marathi: {
      smartPlanner: "स्मार्ट प्रवास नियोजन",
      organizeEvery: "तुमच्या प्रवासातील प्रत्येक",
      momentTrip: "क्षण व्यवस्थित करा",
      heroDescription:
        "तुमचे प्रवासाचे वेळापत्रक तयार करा, उपक्रम व्यवस्थापित करा, महत्त्वाच्या नोंदी ठेवा आणि कोणतेही साहस चुकवू नका.",
      addActivity: "उपक्रम जोडा",

      travelTimeline: "प्रवासाची वेळरेषा",
      timelineDescription:
        "तुमचे संपूर्ण प्रवासाचे वेळापत्रक एका सुंदर ठिकाणी ठेवा.",

      addNewActivity: "नवीन उपक्रम जोडा",
      formDescription:
        "तुमच्या प्रवासाच्या प्रत्येक दिवसासाठी वैयक्तिक प्रवास नियोजन तयार करा.",

      dayNumber: "दिवस क्रमांक",
      activityName: "उपक्रमाचे नाव",
      location: "ठिकाण",
      additionalNotes: "अतिरिक्त नोंदी",

      saving: "जतन होत आहे...",
      saveActivity: "उपक्रम जतन करा",

      yourPlan: "तुमची योजना",
      timelineTitle: "प्रवासाची वेळरेषा",
      timelineDescription2:
        "तुमच्या सर्व नियोजित उपक्रमांना पहा आणि व्यवस्थापित करा.",

      loadingActivities: "उपक्रम लोड होत आहेत...",
      loadingDescription:
        "कृपया प्रतीक्षा करा, तुमचे प्रवास नियोजन लोड होत आहे.",

      noActivities: "अद्याप कोणतेही उपक्रम नाहीत",
      emptyDescription:
        "तुमचे प्रवास नियोजन रिकामे आहे. वर तुमचा पहिला उपक्रम जोडा आणि प्रवासाचे नियोजन सुरू करा.",

      locationNotSpecified: "ठिकाण नमूद केलेले नाही",
      noAdditionalNotes: "अतिरिक्त नोंदी नाहीत.",

      day: "दिवस",
      delete: "हटवा",

      ctaTitle:
        "प्रत्येक उत्तम प्रवासाची सुरुवात नियोजनाने होते",
      ctaDescription:
        "प्रत्येक ठिकाण, उपक्रम आणि आठवण एकाच ठिकाणी व्यवस्थित ठेवा. योग्य नियोजन केलेला प्रवास प्रत्येक सहल अधिक सोपी आणि आनंददायी बनवतो.",
      planAdventure: "तुमच्या पुढील साहसाचे नियोजन करा",

      validDay: "कृपया योग्य दिवस क्रमांक भरा.",
      selectDate: "कृपया तारीख निवडा.",
      selectTime: "कृपया वेळ निवडा.",
      enterActivity: "कृपया उपक्रमाचे नाव भरा.",
      loginAgain: "कृपया पुन्हा लॉगिन करा.",
      activitySaved: "उपक्रम यशस्वीरित्या जतन झाला!",
      saveFailed: "उपक्रम जतन करण्यात अयशस्वी.",
      activityDeleted: "उपक्रम यशस्वीरित्या हटवला!",
      deleteFailed: "उपक्रम हटवण्यात अयशस्वी.",
    },
  };

  const text =
    translations[language] || translations.English;

  // ============================
  // Form State
  // ============================

  const [form, setForm] = useState({
    day: "",
    date: "",
    time: "",
    activity: "",
    location: "",
    notes: "",
  });

  // ============================
  // Activities State
  // ============================

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ============================
  // Fetch Activities
  // ============================

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token not found");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/itinerary",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setActivities(
            response.data.itineraries || []
          );
        }
      } catch (error) {
        console.error(
          "Error fetching itineraries:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // ============================
  // Handle Form Changes
  // ============================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ============================
  // Add Activity
  // ============================

  const addActivity = async (e) => {
    e.preventDefault();

    if (!form.day || Number(form.day) < 1) {
      alert(text.validDay);
      return;
    }

    if (!form.date) {
      alert(text.selectDate);
      return;
    }

    if (!form.time) {
      alert(text.selectTime);
      return;
    }

    if (!form.activity.trim()) {
      alert(text.enterActivity);
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert(text.loginAgain);
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/itinerary",
        {
          day: Number(form.day),
          date: form.date,
          time: form.time,
          activity: form.activity,
          location: form.location,
          notes: form.notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setActivities((prevActivities) => [
          ...prevActivities,
          response.data.itinerary,
        ]);

        setForm({
          day: "",
          date: "",
          time: "",
          activity: "",
          location: "",
          notes: "",
        });

        alert(text.activitySaved);
      }
    } catch (error) {
      console.error(
        "Error creating itinerary:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          text.saveFailed
      );
    } finally {
      setSaving(false);
    }
  };

  // ============================
  // Delete Activity
  // ============================

  const deleteActivity = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert(text.loginAgain);
        return;
      }

      const response = await axios.delete(
        `http://localhost:5000/api/itinerary/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setActivities((prevActivities) =>
          prevActivities.filter(
            (item) => item._id !== id
          )
        );

        alert(text.activityDeleted);
      }
    } catch (error) {
      console.error(
        "Error deleting itinerary:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          text.deleteFailed
      );
    }
  };

  // ============================
  // Format Date
  // ============================

  const formatDate = (date) => {
    if (!date) return "";

    const locale =
      language === "Hindi"
        ? "hi-IN"
        : language === "Marathi"
        ? "mr-IN"
        : "en-IN";

    return new Date(date).toLocaleDateString(
      locale,
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ============================
  // Scroll To Form
  // ============================

  const scrollToForm = () => {
    document
      .querySelector(".form-card")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  // ============================
  // UI
  // ============================

  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <div className="itinerary-page">

          {/* HERO SECTION */}

          <div className="itinerary-hero">

            <div className="hero-left">

              <span className="hero-tag">
                <FaPlaneDeparture />
                {text.smartPlanner}
              </span>

              <h1>
                {text.organizeEvery}
                <br />
                {text.momentTrip}
              </h1>

              <p>
                {text.heroDescription}
              </p>

              <button
                className="hero-btn"
                type="button"
                onClick={scrollToForm}
              >
                <FaPlus />
                {text.addActivity}
              </button>

            </div>

            <div className="hero-right">

              <div className="hero-card">

                <FaRoute className="hero-icon" />

                <h2>
                  {text.travelTimeline}
                </h2>

                <p>
                  {text.timelineDescription}
                </p>

              </div>

            </div>

          </div>

          {/* ADD ACTIVITY FORM */}

          <div className="form-card">

            <div className="card-title">

              <h2>
                <FaClipboardList />
                {text.addNewActivity}
              </h2>

              <p>
                {text.formDescription}
              </p>

            </div>

            <form
              className="activity-form"
              onSubmit={addActivity}
            >

              <div className="form-grid">

                {/* Day */}

                <div className="input-group">

                  <FaCalendarAlt />

                  <input
                    type="number"
                    name="day"
                    min="1"
                    placeholder={text.dayNumber}
                    value={form.day}
                    onChange={handleChange}
                  />

                </div>

                {/* Date */}

                <div className="input-group">

                  <FaCalendarAlt />

                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                  />

                </div>

                {/* Time */}

                <div className="input-group">

                  <FaClock />

                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                  />

                </div>

                {/* Activity */}

                <div className="input-group">

                  <FaClipboardList />

                  <input
                    type="text"
                    name="activity"
                    placeholder={text.activityName}
                    value={form.activity}
                    onChange={handleChange}
                  />

                </div>

                {/* Location */}

                <div className="input-group">

                  <FaMapMarkerAlt />

                  <input
                    type="text"
                    name="location"
                    placeholder={text.location}
                    value={form.location}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* Notes */}

              <div className="input-group textarea-group">

                

                <textarea
                  name="notes"
                  placeholder={text.additionalNotes}
                  value={form.notes}
                  onChange={handleChange}
                />

              </div>

              {/* Save */}

              <button
                className="add-activity-btn"
                type="submit"
                disabled={saving}
              >

                <FaPlus />

                {saving
                  ? text.saving
                  : text.saveActivity}

              </button>

            </form>

          </div>

          {/* TIMELINE */}

          <div className="timeline-section">

            <div className="section-header">

              <div>

                <span className="section-tag">
                  {text.yourPlan}
                </span>

                <h2>
                  {text.timelineTitle}
                </h2>

                <p>
                  {text.timelineDescription2}
                </p>

              </div>

            </div>

            {/* Loading */}

            {loading ? (

              <div className="empty-state">

                <FaRoute className="empty-icon" />

                <h2>
                  {text.loadingActivities}
                </h2>

                <p>
                  {text.loadingDescription}
                </p>

              </div>

            ) : activities.length === 0 ? (

              <div className="empty-state">

                <FaRoute className="empty-icon" />

                <h2>
                  {text.noActivities}
                </h2>

                <p>
                  {text.emptyDescription}
                </p>

              </div>

            ) : (

              <div className="timeline-list">

                {activities.map((item) => (

                  <div
                    key={item._id}
                    className="timeline-card"
                  >

                    {/* Timeline Left */}

                    <div className="timeline-left">

                      <div className="timeline-day">
                        {text.day} {item.day}
                      </div>

                      <div className="timeline-time">
                        {item.time}
                      </div>

                    </div>

                    {/* Timeline Content */}

                    <div className="timeline-content">

                      <h3>
                        {item.activity}
                      </h3>

                      <p className="timeline-location">

                        <FaMapMarkerAlt />

                        {item.location ||
                          text.locationNotSpecified}

                      </p>

                      <p className="timeline-date">

                        <FaCalendarAlt />

                        {formatDate(item.date)}

                      </p>

                      <p className="timeline-notes">

                        {item.notes ||
                          text.noAdditionalNotes}

                      </p>

                    </div>

                    {/* Delete */}

                    <div className="timeline-actions">

                      <button
                        className="delete-btn"
                        type="button"
                        onClick={() =>
                          deleteActivity(item._id)
                        }
                      >
                        {text.delete}
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

          {/* BOTTOM CTA */}

          <div className="travel-cta">

            <div className="cta-content">

              <h2>
                {text.ctaTitle}
              </h2>

              <p>
                {text.ctaDescription}
              </p>

              <button
                className="cta-btn"
                type="button"
                onClick={scrollToForm}
              >

                <FaPlaneDeparture />

                {text.planAdventure}

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}