"use client";

import { useParams } from "next/navigation";
import { EventSectionType } from "@/components/course/event-section/types";

export function useEventParams() {
  const params = useParams();
  const gradableEventId = Number(params.gradableEventId);
  const eventSectionId = Number(params.eventSectionId);
  const eventSectionType = params.eventSectionType as EventSectionType;

  return {
    gradableEventId,
    eventSectionId,
    eventSectionType,
  };
}
