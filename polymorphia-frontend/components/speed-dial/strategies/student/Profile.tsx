import { SpeedDialItem } from "../../types";
import { BaseSpeedDialStrategy } from "../Base";
import { SpeedDialStrategy } from "../types";

export class ProfileStrategy
  extends BaseSpeedDialStrategy
  implements SpeedDialStrategy
{
  getItems(): SpeedDialItem[] {
    return [this.createProfileFilters()];
  }
}
