import { ReactNode } from "react";
import { GradingType } from "@/views/course/grading/types";
import { EventType } from "@/interfaces/api/course";

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
  type: EventType | GradingType;
}
