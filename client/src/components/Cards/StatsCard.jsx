import "./StatsCard.css";
import {
  FaPlaneDeparture,
  FaWallet,
  FaMapMarkerAlt,
  FaSuitcase
} from "react-icons/fa";

export default function StatsCards() {

  const cards = [
    {
      title: "Total Trips",
      value: "12",
      icon: <FaPlaneDeparture />,
      color: "#6C63FF"
    },
    {
      title: "Budget",
      value: "$8,450",
      icon: <FaWallet />,
      color: "#FF7B54"
    },
    {
      title: "Destinations",
      value: "18",
      icon: <FaMapMarkerAlt />,
      color: "#00B894"
    },
    {
      title: "Packing Items",
      value: "86",
      icon: <FaSuitcase />,
      color: "#0984E3"
    }
  ];

  return (
    <div className="stats-grid">

      {cards.map((card, index) => (

        <div className="card" key={index}>

          <div
            className="icon"
            style={{ background: card.color }}
          >
            {card.icon}
          </div>

          <h2>{card.value}</h2>

          <p>{card.title}</p>

        </div>

      ))}

    </div>
  );
}