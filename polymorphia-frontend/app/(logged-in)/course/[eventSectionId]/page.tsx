'use client';

import TestsSection from '@/components/course/event-section/TestsSection';
import Loading from '@/components/general/Loading';
import { useTitle } from '@/components/navigation/TitleContext';
import { EventSectionService } from '@/services/course/EventSectionService';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import '../../../../styles/general.css';
import CourseworkSection from '@/components/course/event-section/CourseworkSection';

export default function EventSection() {
  const { setTitle } = useTitle();

  const params = useParams();
  const eventSectionId = Number(params.eventSectionId);

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
  }, [eventSection]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="basic-container-">
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

  switch (eventSection.type) {
    case 'coursework':
      return <CourseworkSection eventSection={eventSection} />;

    case 'tests':
      return <TestsSection eventSection={eventSection} />;

    case 'project':
      return <></>;
  }
}
