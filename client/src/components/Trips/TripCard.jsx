import "./TripCard.css";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaWallet,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

export default function TripCard({ trip, onDelete }) {
  return (
    <div className="trip-card">
      <img
        src={
          trip.image ||
          "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800"
        }
        alt={trip.destination}
      />

      <div className="trip-info">
        <h2>{trip.destination}</h2>

        <p>
          <FaMapMarkerAlt className="icon" />
          <strong>Country:</strong> {trip.country}
        </p>

        <p>
          <FaCalendarAlt className="icon" />
          <strong>Date:</strong> {trip.date}
        </p>

        <p>
          <FaWallet className="icon" />
          <strong>Budget:</strong> {trip.budget}
        </p>

        <div className="trip-buttons">
          <button className="edit-btn">
            <FaEdit />
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(trip.id)}
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}