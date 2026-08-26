import "./QuickActions.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  FaPlaneDeparture,
  FaHotel,
  FaMoneyBillWave,
  FaMapMarkedAlt,
  FaSuitcaseRolling,
  FaPlusCircle,
} from "react-icons/fa";

export default function QuickActions() {
  const navigate = useNavigate();

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

  const translations = {
    English: {
      heading: "Quick Actions",
      actions: [
        "New Trip",
        "Book Flight",
        "Book Hotel",
        "Manage Budget",
        "Explore Places",
        "Packing List",
      ],
      open: "Open",
    },

    Hindi: {
      heading: "त्वरित कार्य",
      actions: [
        "नई यात्रा",
        "फ्लाइट बुक करें",
        "होटल बुक करें",
        "बजट प्रबंधित करें",
        "स्थान देखें",
        "पैकिंग सूची",
      ],
      open: "खोलें",
    },

    Marathi: {
      heading: "जलद कृती",
      actions: [
        "नवीन सहल",
        "फ्लाइट बुक करा",
        "हॉटेल बुक करा",
        "बजेट व्यवस्थापित करा",
        "ठिकाणे एक्सप्लोर करा",
        "पॅकिंग यादी",
      ],
      open: "उघडा",
    },
  };

  const text = translations[language] || translations.English;

  const actions = [
    {
      title: text.actions[0],
      icon: <FaPlusCircle />,
      color: "#2563EB",
      path: "/trips",
    },
    {
      title: text.actions[1],
      icon: <FaPlaneDeparture />,
      color: "#2563EB",
      path: "/trips",
    },
    {
      title: text.actions[2],
      icon: <FaHotel />,
      color: "#2563EB",
      path: "/trips",
    },
    {
      title: text.actions[3],
      icon: <FaMoneyBillWave />,
      color: "#2563EB",
      path: "/budget",
    },
    {
      title: text.actions[4],
      icon: <FaMapMarkedAlt />,
      color: "#2563EB",
      path: "/itinerary",
    },
    {
      title: text.actions[5],
      icon: <FaSuitcaseRolling />,
      color: "#2563EB",
      path: "/packing",
    },
  ];

  return (
    <div className="quick-actions">
      <h2>{text.heading}</h2>

      <div className="action-grid">
        {actions.map((item, index) => (
          <div
            className="action-card"
            key={index}
            onClick={() => navigate(item.path)}
            style={{ cursor: "pointer" }}
          >
            <div
              className="action-icon"
              style={{ background: item.color }}
            >
              {item.icon}
            </div>

            <h4>{item.title}</h4>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(item.path);
              }}
            >
              {text.open}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}