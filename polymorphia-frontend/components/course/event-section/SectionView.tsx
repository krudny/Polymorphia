import '../../../styles/general.css';
import '../../../styles/event-section.css';
import EventSectionCardGrid from '@/components/course/event-section/card/EventSectionCardGrid';
import PointsSummary from './points-summary/PointsSummary';
import {
  GradableEventCore,
  SectionViewProps,
} from '@/interfaces/course/event-section/EventSectionInterfaces';
import { EventSectionCardProps } from '@/interfaces/course/event-section/card/EventSectionCardInterfaces';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TestDetailsModal from './TestDetailsModal';

export default function SectionView({
  eventSection,
  presentEventsModally = false,
}: SectionViewProps) {
  const router = useRouter();

  const [currentGradableEventModal, setCurrentGradableEventModal] =
    useState<GradableEventCore | null>(null);

  const cards: EventSectionCardProps[] = eventSection.gradableEvents
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

  return (
    <>
      <div className="basic-container section-view">
        <EventSectionCardGrid cards={cards} />
      </div>
      <PointsSummary eventSection={eventSection} />
      {presentEventsModally && eventSection.type === 'tests' && (
        <TestDetailsModal
          testData={
            currentGradableEventModal
              ? {
                  eventSectionId: eventSection.id,
                  gradableEventId: currentGradableEventModal.id,
                }
              : undefined
          }
          onClose={() => setCurrentGradableEventModal(null)}
        />
      )}
    </>
  );
}
