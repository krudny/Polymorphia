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
        return [
          this.createInviteUserToCourse(),
          this.createInviteUserToGroup(),
        ];
      case Roles.COORDINATOR:
        return [
          this.createInviteUserToCourse(),
          this.createInviteUserToGroup(),
          this.createDeleteCourseGroupModal(),
        ];
      default:
        return [];
    }
  }
}
