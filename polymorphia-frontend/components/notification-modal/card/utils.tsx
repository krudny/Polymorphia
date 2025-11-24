import {
  NotificationType,
  NotificationTypes,
} from "@/interfaces/api/notification";
import { NotificationCardCustomOptions } from "@/components/notification-modal/card/types";

export function getNotificationCardCustomOptions(
  notificationType: NotificationType
): NotificationCardCustomOptions {
  switch (notificationType) {
    case NotificationTypes.NEW_GRADE:
      return {
        header: "Nowa ocena!",
        icon: "assignment_returned",
      };
    case NotificationTypes.NEW_REWARD:
      return {
        header: "Nowa nagroda!",
        icon: "trophy",
      };
    default:
      return {
        header: "",
        icon: "",
      };
  }
}
