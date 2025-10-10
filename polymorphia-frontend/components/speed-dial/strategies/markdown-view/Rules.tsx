import { BaseSpeedDialStrategy } from "@/components/speed-dial/strategies/Base";
import { SpeedDialStrategy } from "@/components/speed-dial/strategies/types";
import { SpeedDialItem } from "@/components/speed-dial/types";
import { Role, Roles } from "@/interfaces/api/user";

export class RulesStrategy
  extends BaseSpeedDialStrategy
  implements SpeedDialStrategy
{
  getItems(role: Role): SpeedDialItem[] {
    switch (role) {
      case Roles.STUDENT:
        return [this.createRewards(), this.createGoBack()];
      case Roles.COORDINATOR:
        return [...this.createEditing(), this.createMarkdownReset()];
      default:
        return [];
    }
  }
}
