import { EventType } from "@/interfaces/general";

export interface UseEventParams {
  courseGroupId: number;
  gradableEventId: number;
  eventSectionId: number;
  eventType: EventType;
}
