'use client';

import SectionView from '@/components/course/event-section/SectionView';
import { useParams } from 'next/navigation';
import '../../../../../styles/general.css';

export default function EventSection() {
  const params = useParams();
  const eventSectionType = params.eventSectionType;
  const eventSectionId = Number(params.eventSectionId);

  switch (eventSectionType) {
    case 'ASSIGNMENT':
    case 'TEST':
      return (
        <SectionView
          eventSectionId={eventSectionId}
          eventSectionType={eventSectionType}
        />
      );

    case 'PROJECT':
      return <></>;

    default:
      return <div>Niepoprawna kategoria.</div>;
  }
}
