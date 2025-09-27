import { SpeedDialItem } from "@/components/speed-dial/types";
import { Role } from "@/interfaces/general";

export interface SpeedDialStrategy {
  getItems(role: Role): SpeedDialItem[];
}
