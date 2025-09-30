import { EventType, ViewType } from "@/interfaces/general";
import { SpeedDialKey, SpeedDialKeys } from "./types";
import { Role } from "@/interfaces/api/user";

export function getSpeedDialKey(
  eventType: EventType,
  viewType: ViewType
): SpeedDialKey | null {
  const key = `${eventType}_${viewType}`;

  if (Object.values(SpeedDialKeys).includes(key as SpeedDialKey)) {
    return key as SpeedDialKey;
  }

  return null;
}
