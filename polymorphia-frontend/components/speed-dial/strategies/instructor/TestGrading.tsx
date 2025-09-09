import { BaseSpeedDialStrategy } from "@/components/speed-dial/strategies/Base";
import { SpeedDialStrategy } from "@/components/speed-dial/strategies/types";
import { SpeedDialItem } from "@/components/speed-dial/types";

export class TestGradingStrategy
  extends BaseSpeedDialStrategy
  implements SpeedDialStrategy
{
  getItems(): SpeedDialItem[] {
    return [this.createImportCSV()];
  }
}
