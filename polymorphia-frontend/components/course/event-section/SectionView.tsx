import { useScaleShow } from '@/animations/General';
import '../../../styles/general.css';
import '../../../styles/event-section.css';
import CardGrid from '@/components/card/CardGrid';
import PointsSummary from './points-summary/PointsSummary';
import {
  GradableEventCore,
  SectionViewProps,
} from '@/interfaces/course/EventSectionInterfaces';
import { CardProps } from '@/interfaces/card/CardInterfaces';
import { PointsSummaryElementProps } from '@/interfaces/course/PointsSummaryInterfaces';
import { useRouter } from 'next/navigation';
import Modal from '@/components/modal/Modal';
import { useState } from 'react';

export default function SectionView({
  eventSection,
  presentEventsModally = false,
}: SectionViewProps) {
  const wrapperRef = useScaleShow();
  const router = useRouter();

  const [currentGradableEventModal, setCurrentGradableEventModal] =
    useState<GradableEventCore | null>(null);

  const cards: CardProps[] = eventSection.gradableEvents
    .filter((event) => !event.hidden)
    .map((event) => {
      return {
        id: event.id,
        title: event.name,
        subtitle: event.topic,
        xp: event.gainedXp ? `${event.gainedXp} xp` : undefined,
        onClick: presentEventsModally
          ? () => {
              setCurrentGradableEventModal(event);
            }
          : () => {
              router.push(`/course/${eventSection.id}/${event.id}`);
            },
      };
    });

  const pointsSummaryElements: PointsSummaryElementProps[] = [
    {
      title: 'Zdobyte xp',
      xp: `${eventSection.gainedXp} xp`,
    },
    {
      title: 'Bonusy punktowe',
      xp: `+${eventSection.flatBonusXp} xp`,
    },
    {
      title: 'Bonusy procentowe',
      xp: `+${eventSection.percentageBonusXp} xp`,
    },
    {
      title: 'Łącznie',
      xp: `${eventSection.totalXp} xp`,
    },
  ];

  return (
    <div ref={wrapperRef} className="basic-container section-view">
      <CardGrid cards={cards} />
      <PointsSummary elements={pointsSummaryElements} />
      {presentEventsModally && (
        <Modal
          isOpen={currentGradableEventModal !== null}
          title={currentGradableEventModal?.name ?? ''}
          onClose={() => setCurrentGradableEventModal(null)}
        >
          Hi!
        </Modal>
      )}
    </div>
  );
}
