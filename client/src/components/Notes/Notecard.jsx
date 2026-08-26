import "./NoteCard.css";
import { FaTrash } from "react-icons/fa";

export default function NoteCard({ note, onDelete }) {
  return (
    <div className="note-card">
      <p>{note.text}</p>

      <button onClick={() => onDelete(note.id)}>
        <FaTrash />
      </button>
    </div>
  );
}