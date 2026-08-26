export default function StatsCard({ title, value }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "18px",
        textAlign: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,.08)",
      }}
    >
      <h3>{title}</h3>

      <h1 style={{ color: "#6C63FF" }}>
        {value}
      </h1>
    </div>
  );
}