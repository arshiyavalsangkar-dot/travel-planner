import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Hotel", value: 600 },
  { name: "Food", value: 300 },
  { name: "Transport", value: 200 },
  { name: "Shopping", value: 400 },
];

const COLORS = ["#6C63FF", "#00C49F", "#FFBB28", "#FF8042"];

export default function BudgetChart() {
  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 20,
        boxShadow: "0 8px 20px rgba(0,0,0,.08)",
      }}
    >
      <h2>Expense Distribution</h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={110}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}