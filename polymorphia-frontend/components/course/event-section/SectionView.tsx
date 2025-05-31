import '../../../styles/general.css';
import '../../../styles/event-section.css';
import EventSectionCardGrid from '@/components/course/event-section/card/EventSectionCardGrid';
import PointsSummary from './points-summary/PointsSummary';
import { SectionViewProps } from '@/interfaces/course/event-section/EventSectionInterfaces';
import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { EventSectionService } from '@/services/course/event-section/EventSectionService';
import Loading from '@/components/general/Loading';
import { useTitle } from '@/components/navigation/TitleContext';

export default function SectionView({
  eventSectionId,
  presentEventsModally = false,
}: SectionViewProps) {
  const { setTitle } = useTitle();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const summaryRef = useRef<HTMLDivElement | null>(null);

  const {
    data: eventSection,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ['eventSections', eventSectionId],
    queryFn: () => EventSectionService.getEventSection(eventSectionId),
  });

  useEffect(() => {
    setTitle(isSuccess ? eventSection.name : '');
  }, [eventSection, isSuccess, setTitle]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="basic-container">
        Error loading event section: {error.message}
      </div>
    );
  }

  if (!eventSection) {
    return (
      <div className="basic-container">
        No event section with this ID exists.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      id="section-view-containter"
      className="w-full xl:mx-auto xl:max-w-6/7 3xl:max-w-4/5 p-4 h-[calc(100vh-var(--spacing)*15)] flex flex-col justify-center"
    >
      <EventSectionCardGrid
        eventSection={eventSection}
        presentEventsModally={presentEventsModally}
        containerRef={containerRef}
      />
    </div>
  );
}
