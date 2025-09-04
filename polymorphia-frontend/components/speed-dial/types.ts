import { ReactNode } from "react";
import { EventType, Role, ViewType } from "@/interfaces/general";

export interface SpeedDialItem {
  id: number;
  orderIndex: number;
  label: string;
  icon: string;
  modal?: (onClose: () => void) => ReactNode;
  onClick?: () => void;
  color?: string;
}

export interface SpeedDialProps {
  eventType: EventType;
  viewType: ViewType;
  role: Role;
}
