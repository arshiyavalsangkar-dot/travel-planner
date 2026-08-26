import "./ItineraryCard.css";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";

export default function ItineraryCard({ item }) {
  return (
    <div className="itinerary-card">
      <div className="time-box">
        <h3>{item.time}</h3>
      </div>

      <div className="details">
        <h2>{item.title}</h2>

        <p>
          <FaMapMarkerAlt /> {item.location}
        </p>

        <span>{item.description}</span>
      </div>
    </div>
  );
}