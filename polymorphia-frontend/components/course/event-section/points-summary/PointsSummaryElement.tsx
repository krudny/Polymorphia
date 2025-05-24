import { PointsSummaryElementProps } from '@/interfaces/course/PointsSummaryInterfaces';
import '../../../../styles/points-summary.css';
import clsx from 'clsx';

export default function PointsSummaryElement({
  title,
  xp,
  horizontal = false,
}: PointsSummaryElementProps) {
  return (
    <div
      className={clsx(
        'points-summary-element',
        horizontal
          ? 'points-summary-element-horizontal'
          : 'points-summary-element-vertical'
      )}
    >
      <h1>{title}</h1>
      <h2>{xp}</h2>
    </div>
  );
}
