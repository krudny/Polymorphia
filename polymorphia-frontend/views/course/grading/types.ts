import { ReactNode } from "react";

import { EventType } from "@/interfaces/general";

export interface GradingProps {
  eventType: EventType;
  columns: number;
}

export interface GradingStrategy {
  getGradingComponents: () => GradingComponent[][];
}

export interface GradingComponent {
  component: ReactNode;
  forceFullHeight?: boolean;
}
