import "./ExpenseCard.css";
import { FaTrash } from "react-icons/fa";

export default function ExpenseCard({ expense, onDelete }) {
  return (
    <div className="expense-card">
      <div>
        <h3>{expense.title}</h3>

        <p>{expense.category}</p>
      </div>

      <div className="expense-right">
        <h2>${expense.amount}</h2>

        <button
          className="delete-btn"
          onClick={() => onDelete(expense.id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}