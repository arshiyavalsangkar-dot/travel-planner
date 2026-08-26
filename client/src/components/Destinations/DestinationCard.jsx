import "./DestinationCard.css";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

export default function DestinationCard({ destination }) {
  return (
    <div className="destination-card">
      <img
        src={destination.image}
        alt={destination.name}
      />

      <div className="destination-content">
        <h2>{destination.name}</h2>

        <p>
          <FaMapMarkerAlt /> {destination.country}
        </p>

        <p>
          <FaStar style={{ color: "#FFD700" }} /> {destination.rating}
        </p>

        <p>
          <strong>Budget:</strong> {destination.budget}
        </p>

        <button>View Details</button>
      </div>
    </div>
  );
}