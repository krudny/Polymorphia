import { PointsSummaryElementProps } from '@/interfaces/course/PointsSummaryInterfaces';
import '../../../../styles/points-summary.css';

export default function PointsSummaryElement({
  title,
  xp,
}: PointsSummaryElementProps) {
  return (
    <div className="points-summary-element">
      <h1>{title}</h1>
      <h2>{xp}</h2>
    </div>
  );
}
