import "./QuickActions.css";
import { useNavigate } from "react-router-dom";

import {
  FaPlus,
  FaSuitcaseRolling,
  FaWallet,
  FaMapMarkedAlt,
} from "react-icons/fa";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      id: 1,
      icon: <FaPlus />,
      title: "New Trip",
      path: "/trips",
    },
    {
      id: 2,
      icon: <FaSuitcaseRolling />,
      title: "Packing List",
      path: "/packing",
    },
    {
      id: 3,
      icon: <FaWallet />,
      title: "Manage Budget",
      path: "/budget",
    },
    {
      id: 4,
      icon: <FaMapMarkedAlt />,
      title: "Explore Places",
      path: "/itinerary",
    },
  ];

  return (
    <div className="quick-actions-card">
      <div className="quick-header">
        <h2>Quick Actions</h2>
      </div>

      <div className="quick-grid">
        {actions.map((action) => (
          <button
            key={action.id}
            className="quick-btn"
            onClick={() => navigate(action.path)}
          >
            <div className="quick-icon">
              {action.icon}
            </div>

            <span>{action.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}