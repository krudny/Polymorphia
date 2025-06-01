import '../../../styles/general.css';
import '../../../styles/event-section.css';
import EventSectionCardGrid from '@/components/course/event-section/card/EventSectionCardGrid';
import { SectionViewProps } from '@/interfaces/course/event-section/EventSectionInterfaces';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { EventSectionService } from '@/services/course/event-section/EventSectionService';
import Loading from '@/components/general/Loading';
import { useTitle } from '@/components/navigation/TitleContext';
import { useScaleShow } from '@/animations/General';

export default function SectionView({
  eventSectionId,
  presentEventsModally = false,
}: SectionViewProps) {
  const { setTitle } = useTitle();
  const containerRef = useScaleShow();

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
      <div className="section-view">
        Error loading event section: {error.message}
      </div>
    );
  }

  if (!eventSection) {
    return (
      <div className="section-view">No event section with this ID exists.</div>
    );
  }

  return (
    <div
      ref={containerRef}
      id="section-view-containter"
      className="section-view"
    >
      <EventSectionCardGrid
        eventSection={eventSection}
        presentEventsModally={presentEventsModally}
        containerRef={containerRef}
      />
    </div>
  );
}
