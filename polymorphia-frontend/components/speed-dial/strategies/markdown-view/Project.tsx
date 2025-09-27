import { SpeedDialItem } from "@/components/speed-dial/types";
import { BaseSpeedDialStrategy } from "@/components/speed-dial/strategies/Base";
import {
  SpeedDialContext,
  SpeedDialStrategy,
} from "@/components/speed-dial/strategies/types";
import { Roles } from "@/interfaces/general";

export class ProjectStrategy
  extends BaseSpeedDialStrategy
  implements SpeedDialStrategy
{
  getItems(context: SpeedDialContext): SpeedDialItem[] {
    switch (context.role) {
      case Roles.STUDENT:
        return [
          this.createRewards(),
          this.createProjectVariant(),
          this.createProjectGroup(),
        ];
      case Roles.INSTRUCTOR:
        return [
          ...this.createMarkdownGroup(context),
          this.createRedirectToGrading(context),
          this.createProjectGroupPicking(),
        ];
      default:
        return [];
    }
  }
}
