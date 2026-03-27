export function StatBubble({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="stat-bubble">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
