import { PointsSummaryProps } from '@/interfaces/course/event-section/PointsSummaryInterfaces';
import '../../../../styles/points-summary.css';
import PointsSummaryElement from './PointsSummaryElement';
import { Fragment, useState } from 'react';
import BonusInfoModal from './BonusInfoModal';
import { BonusInfo } from '@/interfaces/course/event-section/EventSectionInterfaces';
import { getBonusesFromEventSection } from '@/services/course/event-section/EventSectionUtils';
import { useScaleShow } from '@/animations/General';

export default function PointsSummary({
  eventSection,
  ref,
}: PointsSummaryProps) {
  const wrapperRef = useScaleShow();
  const [currentBonusInfoModal, setCurrentBonusInfoModal] =
    useState<BonusInfo | null>(null);

  const elements = getBonusesFromEventSection(
    eventSection,
    setCurrentBonusInfoModal
  );

  return (
    <div ref={wrapperRef}>
      <div ref={ref} className="points-summary">
        {elements.map((element, index) => (
          <Fragment key={element.bonus.name}>
            <PointsSummaryElement
              {...element}
              horizontal={index === elements.length - 1}
              onClick={
                element.bonus.items.length > 0
                  ? () => {
                      setCurrentBonusInfoModal(element.bonus);
                    }
                  : undefined
              }
            />
            {index === elements.length - 2 && (
              <div className="points-summary-divider" />
            )}
          </Fragment>
        ))}
      </div>
      <BonusInfoModal
        bonusInfo={currentBonusInfoModal}
        onClose={() => setCurrentBonusInfoModal(null)}
      />
    </div>
  );
}
