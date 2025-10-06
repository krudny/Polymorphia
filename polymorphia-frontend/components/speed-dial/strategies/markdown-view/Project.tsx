import { SpeedDialItem } from "@/components/speed-dial/types";
import { BaseSpeedDialStrategy } from "@/components/speed-dial/strategies/Base";
import { SpeedDialStrategy } from "@/components/speed-dial/strategies/types";
import { Role, Roles } from "@/interfaces/api/user";

export class ProjectStrategy
  extends BaseSpeedDialStrategy
  implements SpeedDialStrategy
{
  getItems(role: Role): SpeedDialItem[] {
    switch (role) {
      case Roles.STUDENT:
        return [
          this.createRewards(),
          this.createProjectVariant(),
          this.createProjectGroup(),
        ];
      case Roles.INSTRUCTOR:
        return [
          this.createRedirectToGrading(),
          this.createProjectGroupPicking(),
        ];
      case Roles.COORDINATOR:
        return [
          ...this.createEditing(),
          this.createRedirectToGrading(),
          this.createProjectGroupPicking(),
          this.createMarkdownReset(),
        ];
      default:
        return [];
    }
  }
}
