import {SpeedDialItem} from "@/components/speed-dial/types";
import {BaseSpeedDialStrategy} from "@/components/speed-dial/strategies/Base";
import {SpeedDialContext, SpeedDialStrategy,} from "@/components/speed-dial/strategies/types";
import {Roles} from "@/interfaces/general";

export class AssignmentStrategy
  extends BaseSpeedDialStrategy
  implements SpeedDialStrategy
{
  getItems(context: SpeedDialContext): SpeedDialItem[] {
    switch (context.role) {
      case Roles.STUDENT:
        return [this.createRewards(), this.createGoBack(context)];
      case Roles.INSTRUCTOR:
        return [this.createRedirectToGrading(context), ...this.createMarkdownGroup(context)];
      default:
        return [];
    }
  }
}
