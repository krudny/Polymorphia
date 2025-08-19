import { SpeedDialItem } from "@/components/speed-dial/types";
import { BaseSpeedDialStrategy } from "@/components/speed-dial/strategy/base";
import {
  SpeedDialContext,
  SpeedDialStrategy,
} from "@/components/speed-dial/strategy/types";

export class AssignmentStrategy
  extends BaseSpeedDialStrategy
  implements SpeedDialStrategy
{
  getItems(context: SpeedDialContext): SpeedDialItem[] {
    return [this.createImportCSVItem(), this.createRewardsItem()];
  }
}
