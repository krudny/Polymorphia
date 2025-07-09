"use client";

import SectionView from "@/components/course/event-section/SectionView";
import { useParams } from "next/navigation";

export default function EventSection() {
  const params = useParams();
  const eventSectionType = params.eventSectionType;
  const eventSectionId = Number(params.eventSectionId);

  switch (eventSectionType) {
    case "assignment":
    case "test":
      return (
        <SectionView
          eventSectionId={eventSectionId}
          eventSectionType={eventSectionType}
        />
      );

    case "project":
      return <></>;

    default:
      return <div>Niepoprawna kategoria.</div>;
  }
}
