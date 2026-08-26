import "./Sidebar.css";

import {
  FaHome,
  FaPlane,
  FaMapMarkedAlt,
  FaWallet,
  FaMoneyBillWave,
  FaSuitcase,
  FaStickyNote,
  FaGlobe,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

import { useLanguage } from "../../context/LanguageContext";

function Sidebar() {
  const navigate = useNavigate();

  const { t } = useLanguage();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <aside className="sidebar">

      {/* LOGO */}

      <div className="sidebar-logo">

        <div className="logo-circle">
          ✈
        </div>

        <div>
          <h2>Travel Planner</h2>
          <p>Explore the World</p>
        </div>

      </div>

      {/* NAVIGATION */}

      <nav>

        <NavLink to="/dashboard">
          <FaHome />
          <span>{t("dashboard")}</span>
        </NavLink>

        <NavLink to="/trips">
          <FaPlane />
          <span>{t("trips")}</span>
        </NavLink>

        <NavLink to="/itinerary">
          <FaMapMarkedAlt />
          <span>{t("itinerary")}</span>
        </NavLink>

        <NavLink to="/budget">
          <FaWallet />
          <span>{t("budget")}</span>
        </NavLink>

        <NavLink to="/expenses">
          <FaMoneyBillWave />
          <span>{t("expenses")}</span>
        </NavLink>

        <NavLink to="/packing">
          <FaSuitcase />
          <span>{t("packing")}</span>
        </NavLink>

        <NavLink to="/notes">
          <FaStickyNote />
          <span>{t("notes")}</span>
        </NavLink>

        <NavLink to="/destinations">
          <FaGlobe />
          <span>{t("destinations")}</span>
        </NavLink>

        <NavLink to="/profile">
          <FaUser />
          <span>{t("profile")}</span>
        </NavLink>

      </nav>

      {/* LOGOUT */}

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        <FaSignOutAlt />
        {t("logout")}
      </button>

    </aside>
  );
}

export default Sidebar;