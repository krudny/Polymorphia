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
import EventSectionCard from './card/EventSectionCard';

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
      <div className="w-full xl:mx-auto xl:max-w-6/7 3xl:max-w-4/5 p-4 h-[calc(100vh-var(--spacing)*15)]">
        <EventSectionCard title="Laboratorium 1" subtitle="Interfejsy i mapy" xp="1.0 xp" size="lg" color="silver"/>
      </div>
    </>
  );
}
