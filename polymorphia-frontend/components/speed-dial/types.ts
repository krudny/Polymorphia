import { EventType } from "@/interfaces/api/DTO";
import { ReactNode } from "react";

export interface SpeedDialProps {
  eventSectionType: EventType;
  gradableEventId: number;
}

export interface SpeedDialItem {
  id: number;
  orderIndex: number;
  label: string;
  icon: string;
  modal?: (onClose: () => void) => ReactNode;
  onClick?: () => void;
  color?: string;
}
