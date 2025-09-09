import "./index.css";

export default function HallOfFamePointsSummary({ total }: { total: string }) {
  return (
    <div className="hall-of-fame-summary-points">
      <h3>Suma</h3>
      <h1>{total}</h1>
    </div>
  );
}
