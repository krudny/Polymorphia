import { EventType } from "@/interfaces/api/DTO";

export interface SpeedDialModalProps {
  gradableEventId: number | undefined;
  onClosed: () => void;
  eventSectionType?: EventType;
}
