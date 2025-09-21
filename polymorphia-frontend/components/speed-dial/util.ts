import {EventType, Role, ViewType} from "@/interfaces/general";
import {SpeedDialKey, SpeedDialKeys} from "./types";

export function getSpeedDialKey(
  eventType: EventType,
  viewType: ViewType,
  role: Role | undefined,
): SpeedDialKey | null {
  const key = `${eventType}_${viewType}_${role}`;

  if (Object.values(SpeedDialKeys).includes(key as SpeedDialKey)) {
    return key as SpeedDialKey;
  }

  return null;
}