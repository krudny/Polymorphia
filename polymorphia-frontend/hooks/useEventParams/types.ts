import { EventType } from "@/interfaces/api/course";

export interface UseEventParams {
  gradableEventId: number;
  eventSectionId: number;
  eventType: EventType;
}