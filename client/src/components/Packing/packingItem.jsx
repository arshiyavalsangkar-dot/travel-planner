import "./PackingItem.css";
import { FaTrash } from "react-icons/fa";

export default function PackingItem({
  item,
  onToggle,
  onDelete,
}) {
  return (
    <div className="packing-item">
      <div>
        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => onToggle(item.id)}
        />

        <span className={item.packed ? "packed" : ""}>
          {item.name}
        </span>
      </div>

      <button onClick={() => onDelete(item.id)}>
        <FaTrash />
      </button>
    </div>
  );
}