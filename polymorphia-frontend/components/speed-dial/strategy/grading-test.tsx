import { BaseSpeedDialStrategy } from "@/components/speed-dial/strategy/base";
import { SpeedDialStrategy } from "@/components/speed-dial/strategy/types";
import { SpeedDialItem } from "@/components/speed-dial/types";

export class GradingTestStrategy
  extends BaseSpeedDialStrategy
  implements SpeedDialStrategy
{
  getItems(): SpeedDialItem[] {
    return [this.createImportCSVItem()];
  }
}
