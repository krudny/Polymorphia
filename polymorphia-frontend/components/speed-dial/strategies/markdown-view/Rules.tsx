import {BaseSpeedDialStrategy} from "@/components/speed-dial/strategies/Base";
import {SpeedDialContext, SpeedDialStrategy} from "@/components/speed-dial/strategies/types";
import {SpeedDialItem} from "@/components/speed-dial/types";
import {Roles} from "@/interfaces/general";

export class RulesStrategy
  extends BaseSpeedDialStrategy
  implements SpeedDialStrategy
{
  getItems(context: SpeedDialContext): SpeedDialItem[] {
    switch (context.role) {
      case Roles.STUDENT:
        return [this.createGoBack(context)];
      case Roles.INSTRUCTOR:
        return [
          ...this.createMarkdownGroup(context),
        ];
      default:
        return [];
    }
  }
}
