import { ReactNode } from "react";

import { EventType } from "@/interfaces/general";

export interface GradingProps {
  eventType: EventType;
  columns: number;
}

export interface GradingStrategy {
  getGradingComponents: () => GradingComponents;
}

export interface GradingComponents {
  components: ReactNode[][];
}
