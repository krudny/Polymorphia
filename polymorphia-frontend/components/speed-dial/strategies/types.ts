import { SpeedDialItem } from "@/components/speed-dial/types";
import { Role } from "@/interfaces/api/user";
import { AppRouterInstance } from "@/interfaces/general";

export interface SpeedDialStrategy {
  getItems(role: Role): SpeedDialItem[];
}
