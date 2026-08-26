import "./RecentTrips.css";
const trips = [
  {
    id: 1,
    destination: "Goa",
    date: "25 July 2026",
    status: "Upcoming",
  },
  {
    id: 2,
    destination: "Manali",
    date: "10 August 2026",
    status: "Planned",
  },
  {
    id: 3,
    destination: "Dubai",
    date: "15 September 2026",
    status: "Completed",
  },
];

export default function RecentTrips() {
  return (
    <div className="recent-trips-card">
      <div className="card-header">
        <h2>Recent Trips</h2>
      </div>

      <div className="trip-list">
        {trips.map((trip) => (
          <div className="trip-item" key={trip.id}>
            <div>
              <h4>{trip.destination}</h4>
              <p>{trip.date}</p>
            </div>

            <span className={`status ${trip.status.toLowerCase()}`}>
              {trip.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}