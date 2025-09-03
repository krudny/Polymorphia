import { ReactNode } from "react";
import { EventType, ViewType } from "@/interfaces/api/course";
import { Role } from "@/interfaces/api/temp";

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
