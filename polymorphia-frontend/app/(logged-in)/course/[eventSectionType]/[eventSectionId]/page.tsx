"use client";

import SectionView from "@/components/course/event-section/SectionView";
import { useParams } from "next/navigation";

export default function EventSection() {
  const params = useParams();
  const eventSectionType = String(params.eventSectionType);
  const eventSectionId = Number(params.eventSectionId);

  switch (eventSectionType) {
    case "assignment":
    case "test":
    case "project":
      return (
        <SectionView
          eventSectionId={eventSectionId}
          eventSectionType={eventSectionType}
        />
      );

    // case "project":
    //   return (
    //     <ProjectView
    //       eventSectionId={eventSectionId}
    //       eventSectionType={eventSectionType}
    //     />
    //   );

    default:
      return <div>Niepoprawna kategoria.</div>;
  }
}
