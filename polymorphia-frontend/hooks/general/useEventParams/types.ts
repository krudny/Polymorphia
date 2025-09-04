import {EventType} from "@/interfaces/general";

export interface UseEventParams {
  gradableEventId: number;
  eventSectionId: number;
  eventType: EventType;
}
