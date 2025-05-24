import {
  PointsSummaryElementProps,
  PointsSummaryProps,
} from '@/interfaces/course/PointsSummaryInterfaces';
import '../../../../styles/points-summary.css';
import PointsSummaryElement from './PointsSummaryElement';
import { useScaleShow } from '@/animations/General';
import { Fragment, useState } from 'react';
import BonusInfoModal from './BonusInfoModal';
import { BonusInfo } from '@/interfaces/course/EventSectionInterfaces';

export default function PointsSummary({ eventSection }: PointsSummaryProps) {
  const wrapperRef = useScaleShow();
  const [currentBonusInfoModal, setCurrentBonusInfoModal] =
    useState<BonusInfo | null>(null);

  const elements: PointsSummaryElementProps[] = [
    {
      bonus: {
        name: 'Zdobyte xp',
        bonusXp: `${eventSection.gainedXp} xp`,
        items: [],
      },
    },
    ...eventSection.bonuses.map((bonus) => {
      return {
        bonus: {
          ...bonus,
          bonusXp: `+${bonus.bonusXp} xp`,
          bonusPercentage: bonus.bonusPercentage
            ? `+${bonus.bonusPercentage}$`
            : undefined,
        },
        onClick: () => setCurrentBonusInfoModal(bonus),
      };
    }),
    {
      bonus: {
        name: 'Łącznie',
        bonusXp: `${eventSection.totalXp} xp`,
        items: [],
      },
      horizontal: true,
    },
  ];

  return (
    <>
      <div ref={wrapperRef} className="points-summary">
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
    </>
  );
}
