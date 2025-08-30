import { EventType } from "@/interfaces/api/course";

export interface UseEventParams {
  gradableEventId: number | undefined;
  eventSectionId: number | undefined;
  eventType: EventType;
}
