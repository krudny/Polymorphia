'use client';

import { useScaleShow } from '@/animations/General';
import TestsSection from '@/components/course/event-section/TestsSection';
import Loading from '@/components/general/Loading';
import { useTitle } from '@/components/navigation/TitleContext';
import { EventSectionService } from '@/services/course/EventSectionService';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EventSection() {
  const wrapperRef = useScaleShow();
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
    return <div>Error loading event section: {error.message}</div>;
  }

  if (!eventSection) {
    return <div>No event section with this ID exists.</div>;
  }

  switch (eventSection.type) {
    case 'coursework':
      return <></>;

    case 'tests':
      return <TestsSection />;

    case 'project':
      return <></>;
  }
}
