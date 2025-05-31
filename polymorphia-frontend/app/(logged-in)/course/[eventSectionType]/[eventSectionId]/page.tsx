'use client';

import SectionView from '@/components/course/event-section/SectionView';
import { useParams } from 'next/navigation';
import '../../../../../styles/general.css';

export default function EventSection() {
  const params = useParams();
  const eventSectionType = params.eventSectionType;
  const eventSectionId = Number(params.eventSectionId);

  switch (eventSectionType) {
    case 'coursework':
      return <SectionView eventSectionId={eventSectionId} />;

    case 'tests':
      return <SectionView eventSectionId={eventSectionId} presentEventsModally />;

    case 'project':
      return <></>;
    
    default:
      return <div>Niepoprawna kategoria.</div>
  }
}
