import { PointsSummaryElementProps } from '@/interfaces/course/PointsSummaryInterfaces';
import '../../../../styles/points-summary.css';

export default function PointsSummaryElement({
  title,
  xp,
}: PointsSummaryElementProps) {
  return (
    <div className="flex flex-col items-center md:items-end">
      <h1 className="text-4xl text-nowrap">{title}</h1>
      <h2 className="text-7xl text-nowrap">{xp}</h2>
    </div>
  );
}
