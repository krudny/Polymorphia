import { SpeedDialItem } from "@/components/speed-dial/types";
import { BaseSpeedDialStrategy } from "@/components/speed-dial/strategies/Base";
import { SpeedDialStrategy } from "@/components/speed-dial/strategies/types";

export class ProfileStrategy
  extends BaseSpeedDialStrategy
  implements SpeedDialStrategy
{
  getItems(): SpeedDialItem[] {
    return [this.createProfileFilters()];
  }
}
