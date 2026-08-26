import "./SettingItem.css";

export default function SettingItem({
  title,
  description,
  children,
}) {
  return (
    <div className="setting-item">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div>
        {children}
      </div>
    </div>
  );
}