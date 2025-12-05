import { BaseSpeedDialStrategy } from "@/components/speed-dial/strategies/Base";
import { SpeedDialStrategy } from "@/components/speed-dial/strategies/types";
import { SpeedDialItem } from "@/components/speed-dial/types";
import { Role, Roles } from "@/interfaces/api/user";

export class CourseGroupStrategy
  extends BaseSpeedDialStrategy
  implements SpeedDialStrategy
{
  getItems(role: Role): SpeedDialItem[] {
    switch (role) {
      case Roles.INSTRUCTOR:
        return [this.createInviteUserToGroup(), this.createDeleteAnimalModal()];
      case Roles.COORDINATOR:
        return [
          this.createInviteUserToGroup(),
          this.createDeleteAnimalModal(),
          this.createDeleteCourseGroupModal(),
        ];
      default:
        return [];
    }
  }
}
