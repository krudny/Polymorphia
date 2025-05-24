// 'use client';

// import SectionView from '@/components/course/event-section/SectionView';
// import Loading from '@/components/general/Loading';
// import { useTitle } from '@/components/navigation/TitleContext';
// import { EventSectionService } from '@/services/course/EventSectionService';
// import { useQuery } from '@tanstack/react-query';
// import { useParams } from 'next/navigation';
// import { useEffect } from 'react';
// import '../../../../styles/general.css';

// export default function GradableEvent() {
//   const { setTitle } = useTitle();

//   const params = useParams();
//   const eventSectionId = Number(params.eventSectionId);
//   const gradableEventId = Number(params.gradableEventId);

//   const {
//     data: gradableEvent,
//     isLoading,
//     isSuccess,
//     error,
//   } = useQuery({
//     queryKey: ['gradableEvents', eventSectionId, gradableEventId],
//     queryFn: () => EventSectionService.getGradableEvent(eventSectionId, gradableEventId),
//   });

//   useEffect(() => {
//     setTitle(isSuccess ? eventSection.name : '');
//   }, [eventSection]);

//   if (isLoading) {
//     return <Loading />;
//   }

//   if (error) {
//     return (
//       <div className="basic-container-">
//         Error loading event section: {error.message}
//       </div>
//     );
//   }

//   if (!eventSection) {
//     return (
//       <div className="basic-container">
//         No event section with this ID exists.
//       </div>
//     );
//   }

//   switch (eventSection.type) {
//     case 'coursework':
//       return <SectionView eventSection={eventSection} />;

//     case 'tests':
//       return <SectionView eventSection={eventSection} presentEventsModally />;

//     case 'project':
//       return <></>;
//   }
// }
