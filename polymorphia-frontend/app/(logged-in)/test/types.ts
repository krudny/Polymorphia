import { ReactNode } from "react";

export interface SpeedDialProps {
  items: SpeedDialItem[];
}

export interface SpeedDialItem {
  label: string;
  icon: string;
  modal: (onClose: () => void) => ReactNode;
}
