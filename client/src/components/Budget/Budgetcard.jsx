import "./BudgetCard.css";

export default function BudgetCard({ title, amount, color }) {
  return (
    <div className="budget-card">
      <h3>{title}</h3>

      <h1 style={{ color }}>{amount}</h1>
    </div>
  );
}