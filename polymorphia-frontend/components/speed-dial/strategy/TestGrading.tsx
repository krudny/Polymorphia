import { BaseSpeedDialStrategy } from "@/components/speed-dial/strategy/Base";
import { SpeedDialStrategy } from "@/components/speed-dial/strategy/types";
import { SpeedDialItem } from "@/components/speed-dial/types";

export class TestGradingStrategy
  extends BaseSpeedDialStrategy
  implements SpeedDialStrategy
{
  getItems(): SpeedDialItem[] {
    return [this.createImportCSVItem()];
  }
}
