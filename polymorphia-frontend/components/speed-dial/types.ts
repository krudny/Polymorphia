import { ReactNode } from "react";
import { EventType, ViewType } from "@/interfaces/general";

export interface SpeedDialItem {
  id: number;
  orderIndex: number;
  label: string;
  icon: string;
  modal?: (onClose: () => void) => ReactNode;
  onClick?: () => void;
  color?: string;
}

export interface SpeedDialEventProps {
  eventType: EventType;
  viewType: ViewType;
}

export interface SpeedDialProps {
  items: SpeedDialItem[];
}
