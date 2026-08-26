import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Navbar.css";

export default function Navbar({ toggleSidebar }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState("");

  // Load profile image
  useEffect(() => {
    const loadProfileImage = () => {
      const savedImage = localStorage.getItem("profileImage");
      setProfileImage(savedImage || "");
    };

    // Load when Navbar opens
    loadProfileImage();

    // Update Navbar when profile photo changes
    window.addEventListener("profileImageUpdated", loadProfileImage);

    return () => {
      window.removeEventListener(
        "profileImageUpdated",
        loadProfileImage
      );
    };
  }, []);

  return (
    <header className="navbar">

      {/* LEFT SIDE */}
      <div className="nav-left">
        {/* Search bar removed */}
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">

        {/* USER PROFILE */}
        <div
          className="user-area"
          onClick={() => navigate("/profile")}
        >

          {/* PROFILE PHOTO */}
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="user-avatar"
            />
          ) : (
            <FaUserCircle className="user-avatar default-avatar" />
          )}

          {/* USER DETAILS */}
          <div className="user-info">

            <div className="user-role">
              Traveller
            </div>

            <div className="user-email">
              {user?.email || "Guest User"}
            </div>

          </div>

        </div>

      </div>

    </header>
  );
}