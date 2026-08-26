import { useState } from "react";

export default function PackingForm({ onAdd }) {
  const [item, setItem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!item.trim()) {
      alert("Enter an item");
      return;
    }

    onAdd({
      id: Date.now(),
      name: item,
      packed: false,
    });

    setItem("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
      }}
    >
      <input
        type="text"
        placeholder="Enter packing item..."
        value={item}
        onChange={(e) => setItem(e.target.value)}
        style={{
          flex: 1,
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ccc",
        }}
      />

      <button
        type="submit"
        style={{
          background: "#6C63FF",
          color: "#fff",
          border: "none",
          padding: "12px 20px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Add
      </button>
    </form>
  );
}