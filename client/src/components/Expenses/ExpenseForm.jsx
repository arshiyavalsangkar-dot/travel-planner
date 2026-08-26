import { useState } from "react";

export default function ExpenseForm({ onAddExpense }) {
  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!expense.title || !expense.category || !expense.amount) {
      alert("Please fill all fields");
      return;
    }

    onAddExpense({
      id: Date.now(),
      ...expense,
    });

    setExpense({
      title: "",
      category: "",
      amount: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 15,
        marginBottom: 30,
        boxShadow: "0 8px 20px rgba(0,0,0,.08)",
      }}
    >
      <h2>Add Expense</h2>

      <br />

      <input
        type="text"
        placeholder="Expense Title"
        value={expense.title}
        onChange={(e) =>
          setExpense({ ...expense, title: e.target.value })
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Category"
        value={expense.category}
        onChange={(e) =>
          setExpense({ ...expense, category: e.target.value })
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Amount"
        value={expense.amount}
        onChange={(e) =>
          setExpense({ ...expense, amount: e.target.value })
        }
      />

      <br />
      <br />

      <button type="submit">
        Add Expense
      </button>
    </form>
  );
}