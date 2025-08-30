import { EventType } from "@/interfaces/api/course";

export interface SpeedDialModalProps {
  gradableEventId: number | undefined;
  onClosed: () => void;
  eventSectionType?: EventType;
}
