import { SpeedDialItem } from "@/components/speed-dial/types";
import { BaseSpeedDialStrategy } from "@/components/speed-dial/strategy/base";
import {
  SpeedDialContext,
  SpeedDialStrategy,
} from "@/components/speed-dial/strategy/types";

export class ProjectStrategy
  extends BaseSpeedDialStrategy
  implements SpeedDialStrategy
{
  getItems(context: SpeedDialContext): SpeedDialItem[] {
    const editingItems = this.createEditingItems(context);
    const baseItems = [
      this.createRewardsItem(),
      this.createProjectVariantItem(),
      this.createProjectGroupItem(),
      this.createProjectGroupPickingItem(),
    ];

    return [...editingItems, ...baseItems];
  }
}
