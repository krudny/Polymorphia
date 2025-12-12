import "./index.css";

export default function HallOfFamePointsSummary({ total }: { total: string }) {
  return (
    <div className="points-summary">
      <h3>Suma</h3>
      <h1>{total}</h1>
    </div>
  );
}
