"use client";

import { useParams } from "next/navigation";
import { EventType } from "@/interfaces/api/course";
import { UseEventParams } from "@/hooks/general/useEventParams/types";

export function useEventParams(): UseEventParams {
  const params = useParams();
  const gradableEventId = Number(params.gradableEventId);
  const eventSectionId = Number(params.eventSectionId);
  const eventType = String(params.eventType).toUpperCase() as EventType;

  return {
    gradableEventId,
    eventSectionId,
    eventType,
  };
}
