import "../../styles/hall-of-fame.css";

export default function RankSummary({ total }: { total: string }) {
  return (
    <div className="hall-of-fame-summary-points">
      <h3>Suma</h3>
      <h1>{total}</h1>
    </div>
  );
}
