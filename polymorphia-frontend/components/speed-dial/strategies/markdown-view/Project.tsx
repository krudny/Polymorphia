import { SpeedDialItem } from "@/components/speed-dial/types";
import { BaseSpeedDialStrategy } from "@/components/speed-dial/strategies/Base";
import {
  SpeedDialContext,
  SpeedDialStrategy,
} from "@/components/speed-dial/strategies/types";
import { Roles } from "@/interfaces/api/user";

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
      this.createGoBackItem(context),
    ];

    switch (context.role) {
      case Roles.STUDENT:
        return [...baseItems];
      case Roles.INSTRUCTOR:
        return [...editingItems, ...baseItems];
      default:
        return [];
    }
  }
}
