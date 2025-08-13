import { ReactNode } from "react";

export interface SpeedDialItem {
  id: number;
  order: number;
  label: string;
  icon: string;
  modal?: (onClose: () => void) => ReactNode;
  onClick?: () => void;
  color?: string;
}
