import {
  NotificationType,
  NotificationTypes,
} from "@/interfaces/api/notification";

export function getNotificationCardHeader(notificationType: NotificationType) {
  switch (notificationType) {
    case NotificationTypes.NEW_GRADE:
      return "Nowa ocena!";
    case NotificationTypes.NEW_REWARD:
      return "Nowa nagroda!";
    default:
      return "";
  }
}
