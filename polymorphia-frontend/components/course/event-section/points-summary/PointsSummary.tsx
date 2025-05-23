import { PointsSummaryProps } from '@/interfaces/course/PointsSummaryInterfaces';
import '../../../../styles/points-summary.css';
import PointsSummaryElement from './PointsSummaryElement';

export default function PointsSummary({ children }: PointsSummaryProps) {
  return (
    <div className="flex gap-10 max-md:items-center flex-col md:justify-between md:items-end md:h-[calc(100vh-var(--spacing)*25)] pb-5">
      {children}
    </div>
  );
}
