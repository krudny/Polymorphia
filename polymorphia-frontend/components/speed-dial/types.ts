import { ReactNode } from "react";
import { EventSectionType } from "@/components/course/event-section/types";

export interface SpeedDialProps {
  eventSectionType: EventSectionType;
  gradableEventId: number;
}

export interface SpeedDialItem {
  id: number;
  order: number;
  label: string;
  icon: string;
  modal?: (onClose: () => void) => ReactNode;
  onClick?: () => void;
  color?: string;
}
