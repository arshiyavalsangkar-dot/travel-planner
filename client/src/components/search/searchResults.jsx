import { FaSearch } from "react-icons/fa";
import "./SearchResults.css";

import { useSearch } from "../../context/SearchContext";

const sampleData = [
  { id: 1, name: "Goa Trip", type: "Trip" },
  { id: 2, name: "Manali", type: "Destination" },
  { id: 3, name: "Dubai", type: "Destination" },
  { id: 4, name: "Thailand", type: "Destination" },
  { id: 5, name: "Paris", type: "Destination" },
  { id: 6, name: "Budget Planner", type: "Budget" },
  { id: 7, name: "Packing List", type: "Packing" },
  { id: 8, name: "Travel Notes", type: "Notes" },
  { id: 9, name: "Profile", type: "Page" },
  { id: 10, name: "Dashboard", type: "Page" }
];

export default function SearchResults() {
  const { searchTerm } = useSearch();

  if (!searchTerm.trim()) return null;

  const results = sampleData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-results">
      {results.length > 0 ? (
        results.map((item) => (
          <div
            key={item.id}
            className="search-item"
          >
            <div className="search-left">
              <FaSearch className="search-icon" />

              <div>
                <h4>{item.name}</h4>
                <span>{item.type}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="search-empty">
          No results found for "<strong>{searchTerm}</strong>"
        </div>
      )}
    </div>
  );
}