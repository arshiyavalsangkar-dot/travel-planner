export default function ExpenseTable() {
  const expenses = [
    { category: "Hotel", amount: "$600" },
    { category: "Food", amount: "$300" },
    { category: "Transport", amount: "$200" },
    { category: "Shopping", amount: "$400" },
  ];

  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 20,
        marginTop: 30,
        boxShadow: "0 8px 20px rgba(0,0,0,.08)",
      }}
    >
      <h2>Expenses</h2>

      <table
        style={{
          width: "100%",
          marginTop: 20,
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th align="left">Category</th>
            <th align="right">Amount</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: "12px 0" }}>{item.category}</td>
              <td align="right">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}