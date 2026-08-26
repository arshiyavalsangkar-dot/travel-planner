import { useState } from "react";

export default function NoteForm({ onAdd }) {
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!note.trim()) {
      alert("Please enter a note");
      return;
    }

    onAdd({
      id: Date.now(),
      text: note,
    });

    setNote("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "25px",
      }}
    >
      <input
        type="text"
        placeholder="Write a travel note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
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