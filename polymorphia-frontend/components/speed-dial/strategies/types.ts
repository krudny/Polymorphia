import { SpeedDialItem } from "@/components/speed-dial/types";
import { Role } from "@/interfaces/general";

export interface SpeedDialContext {
  role: Role;
}

export interface SpeedDialStrategy {
  getItems(context: SpeedDialContext): SpeedDialItem[];
}
