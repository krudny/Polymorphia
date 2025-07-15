import { ReactNode } from "react";
import { EventSectionType } from "@/components/course/event-section/types";

export interface SpeedDialProps {
  eventSectionType: EventSectionType;
  eventId: number;
}

export interface SpeedDialItem {
  order: number;
  label: string;
  icon: string;
  modal?: (onClose: () => void) => ReactNode;
  onClick?: () => void;
}
