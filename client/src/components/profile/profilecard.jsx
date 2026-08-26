import "./Profile.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit } from "react-icons/fa";

export default function ProfileCard() {
  return (
    <div className="profile-card">
      <img
        src="https://i.pravatar.cc/200"
        alt="Profile"
      />

      <h2>Arshiya Valsungkar</h2>

      <p>Travel Explorer</p>

      <div className="profile-info">
        <p>
          <FaEnvelope /> arshiya@gmail.com
        </p>

        <p>
          <FaPhone /> +91 9876543210
        </p>

        <p>
          <FaMapMarkerAlt /> Solapur, India
        </p>
      </div>

      <button>
        <FaEdit /> Edit Profile
      </button>
    </div>
  );
}