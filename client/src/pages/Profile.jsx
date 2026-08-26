import { useLanguage } from "../context/LanguageContext";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

import {
  FaUser,
  FaCamera,
  FaEnvelope,
  FaPhone,
  FaGlobeAsia,
  FaSave,
} from "react-icons/fa";

import "./Profile.css";

export default function Profile() {
  const fileInputRef = useRef(null);

  const { language, changeLanguage, t } = useLanguage();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    bio: "",
    language: language || "English",
  });

  const [savedProfile, setSavedProfile] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    bio: "",
    language: language || "English",
  });

  const [profileImage, setProfileImage] = useState("");

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
  // LOAD PROFILE
  // ============================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = getToken();

        if (!token) return;

        const response = await axios.get(
          "http://localhost:5000/api/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data =
          response.data.user ||
          response.data.profile ||
          response.data;

        const savedLanguage =
          data.preferredLanguage ||
          data.language ||
          localStorage.getItem("language") ||
          "English";

        const profileData = {
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          country: data.country || "",
          bio: data.bio || "",
          language: savedLanguage,
        };

        setProfile(profileData);
        setSavedProfile(profileData);

        // Keep LanguageContext synchronized
        if (
          savedLanguage &&
          savedLanguage !== language
        ) {
          changeLanguage(savedLanguage);
        }

        const savedImage =
          localStorage.getItem("profileImage");

        if (savedImage) {
          setProfileImage(savedImage);
        }
      } catch (error) {
        console.error(
          "Load Profile Error:",
          error.response?.data || error.message
        );
      }
    };

    loadProfile();
  }, []);

  // ============================
  // HANDLE INPUT
  // ============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================
  // HANDLE IMAGE
  // ============================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setProfileImage(imageUrl);

    localStorage.setItem("profileImage", imageUrl);
    
  };

  // ============================
  // SAVE PROFILE
  // ============================

  const handleSave = async () => {
    try {
      const token = getToken();

      if (!token) {
        alert("Please login again.");
        return;
      }

      const response = await axios.put(
        "http://localhost:5000/api/profile",
        {
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          country: profile.country,
          bio: profile.bio,
          preferredLanguage:
            profile.language || language,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedProfile =
        response.data.profile ||
        response.data.user ||
        profile;

      const finalLanguage =
        updatedProfile.preferredLanguage ||
        updatedProfile.language ||
        profile.language ||
        language ||
        "English";

      const finalProfile = {
        name: updatedProfile.name || "",
        email: updatedProfile.email || "",
        phone: updatedProfile.phone || "",
        country: updatedProfile.country || "",
        bio: updatedProfile.bio || "",
        language: finalLanguage,
      };

      setProfile(finalProfile);
      setSavedProfile(finalProfile);

      // Save language everywhere
      changeLanguage(finalLanguage);
      localStorage.setItem(
        "language",
        finalLanguage
      );

      alert(t("profileUpdated"));
    } catch (error) {
      console.error(
        "Save Profile Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          t("profileUpdateFailed")
      );
    }
  };

  // ============================
  // CHANGE LANGUAGE
  // ============================

  const handleLanguageChange = async (e) => {
    const newLanguage = e.target.value;

    if (!newLanguage) return;

    // Update UI immediately
    setProfile((prev) => ({
      ...prev,
      language: newLanguage,
    }));

    // Save in LanguageContext + localStorage
    changeLanguage(newLanguage);
    localStorage.setItem(
      "language",
      newLanguage
    );

    try {
      const token = getToken();

      if (!token) return;

      await axios.put(
        "http://localhost:5000/api/profile",
        {
          preferredLanguage: newLanguage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSavedProfile((prev) => ({
        ...prev,
        language: newLanguage,
      }));
    } catch (error) {
      console.error(
        "Language Save Error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <div className="profile-page">

          {/* ==========================
              PROFILE HEADER
          ========================== */}

          <div className="profile-header">

            <div className="profile-image-section">

              <img
                src={
                  profileImage ||
                  "https://via.placeholder.com/180x180.png?text=Profile"
                }
                alt="Profile"
                className="profile-image"
              />

              <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handleImageChange}
              />

              <button
                type="button"
                className="change-photo-btn"
                onClick={() =>
                  fileInputRef.current?.click()
                }
              >
                <FaCamera />
                {t("changePhoto")}
              </button>

            </div>

            <div className="profile-heading">

              <h1>
                <FaUser />
                {savedProfile.name ||
                  t("myProfile")}
              </h1>

              <p>
                {savedProfile.email || ""}
              </p>

              <p>
                {savedProfile.phone || ""}

                {savedProfile.country
                  ? ` | ${savedProfile.country}`
                  : ""}
              </p>

              {savedProfile.language && (
                <p>
                  {t("languageLabel")}:{" "}
                  {savedProfile.language}
                </p>
              )}

              <p>
                {t("profileDescription")}
              </p>

            </div>

          </div>


          {/* ==========================
              PERSONAL INFORMATION
          ========================== */}

          <div className="profile-card">

            <div className="card-title">

              <h2>
                {t("personalInformation")}
              </h2>

              <p>
                {t("updateAccountDetails")}
              </p>

            </div>

            <div className="profile-form">

              <div className="form-grid">

                {/* NAME */}

                <div className="input-group">

                  <FaUser />

                  <input
                    type="text"
                    name="name"
                    placeholder={t("fullName")}
                    value={profile.name}
                    onChange={handleChange}
                  />

                </div>


                {/* EMAIL */}

                <div className="input-group">

                  <FaEnvelope />

                  <input
                    type="email"
                    name="email"
                    placeholder={t("emailAddress")}
                    value={profile.email}
                    onChange={handleChange}
                  />

                </div>


                {/* PHONE */}

                <div className="input-group">

                  <FaPhone />

                  <input
                    type="text"
                    name="phone"
                    placeholder={t("phoneNumber")}
                    value={profile.phone}
                    onChange={handleChange}
                  />

                </div>


                {/* COUNTRY */}

                <div className="input-group">

                  <FaGlobeAsia />

                  <input
                    type="text"
                    name="country"
                    placeholder={t("country")}
                    value={profile.country}
                    onChange={handleChange}
                  />

                </div>

              </div>


              {/* BIO */}

              <div className="textarea-group">

                <textarea
                  name="bio"
                  placeholder={t("writeAboutYourself")}
                  value={profile.bio}
                  onChange={handleChange}
                />

              </div>


              {/* SAVE */}

              <button
                type="button"
                className="save-profile-btn"
                onClick={handleSave}
              >
                <FaSave />
                {t("saveChanges")}
              </button>

            </div>

          </div>


          {/* ==========================
              PREFERRED LANGUAGE
          ========================== */}

          <div className="profile-card">

            <div className="card-title">

              <h2>
                {t("preferredLanguage")}
              </h2>

              <p>
                {t("selectPreferredLanguage")}
              </p>

            </div>

            <div className="form-grid">

              <div className="input-group">

                <FaGlobeAsia />

                <select
                  name="language"
                  value={
                    profile.language ||
                    language ||
                    "English"
                  }
                  onChange={handleLanguageChange}
                >

                  <option value="English">
                    {t("english")}
                  </option>

                  <option value="Hindi">
                    {t("hindi")}
                  </option>

                  <option value="Marathi">
                    {t("marathi")}
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* ==========================
              PROFILE FOOTER
          ========================== */}

          <div className="profile-footer">

            <h2>
              {t("travelMoreWorryLess")}
            </h2>

            <p>
              {t("keepProfileUpdated")}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}