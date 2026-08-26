import "./PopularDestinations.css";

const destinations = [
  {
    id: 1,
    name: "Goa",
    country: "India",
    rating: "4.8 ⭐",
  },
  {
    id: 2,
    name: "Manali",
    country: "India",
    rating: "4.7 ⭐",
  },
  {
    id: 3,
    name: "Dubai",
    country: "UAE",
    rating: "4.9 ⭐",
  },
  {
    id: 4,
    name: "Paris",
    country: "France",
    rating: "4.8 ⭐",
  },
];

export default function PopularDestinations() {
  return (
    <div className="popular-card">
      <div className="popular-header">
        <h2>Popular Destinations</h2>
      </div>

      <div className="destination-list">
        {destinations.map((item) => (
          <div
            className="destination-item"
            key={item.id}
          >
            <div className="destination-info">
              <h4>{item.name}</h4>
              <p>{item.country}</p>
            </div>

            <span className="rating">
              {item.rating}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}