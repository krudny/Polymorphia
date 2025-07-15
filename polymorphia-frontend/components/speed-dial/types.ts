import { ReactNode } from "react";

export interface SpeedDialProps {
  items: SpeedDialItem[];
}

export interface SpeedDialItem {
  order: number;
  label: string;
  icon: string;
  modal: (onClose: () => void) => ReactNode;
}
