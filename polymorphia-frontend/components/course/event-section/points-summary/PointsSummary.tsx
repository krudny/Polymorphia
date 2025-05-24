import { PointsSummaryProps } from '@/interfaces/course/PointsSummaryInterfaces';
import '../../../../styles/points-summary.css';
import PointsSummaryElement from './PointsSummaryElement';
import { useScaleShow } from '@/animations/General';
import { Fragment } from 'react';

export default function PointsSummary({ elements }: PointsSummaryProps) {
  const wrapperRef = useScaleShow();

  return (
    <div ref={wrapperRef} className="points-summary">
      {elements.map((element, index) => (
        <Fragment key={element.title}>
          <PointsSummaryElement
            {...element}
            horizontal={index === elements.length - 1}
          />
          {index === elements.length - 2 && (
            <div className="points-summary-divider" />
          )}
        </Fragment>
      ))}
    </div>
  );
}
