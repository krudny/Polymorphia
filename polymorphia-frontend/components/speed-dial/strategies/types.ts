import { SpeedDialItem } from "@/components/speed-dial/types";
import { Role } from "@/interfaces/api/user";

export interface SpeedDialStrategy {
  getItems(role: Role): SpeedDialItem[];
}
