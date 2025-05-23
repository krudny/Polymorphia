import { PointsSummaryProps } from '@/interfaces/course/PointsSummaryInterfaces';
import '../../../../styles/points-summary.css';
import PointsSummaryElement from './PointsSummaryElement';

export default function PointsSummary({ elements }: PointsSummaryProps) {
  return (
    <div className="points-summary">
      {elements.map((element) => (
        <PointsSummaryElement key={element.title} {...element} />
      ))}
    </div>
  );
}
