import { NotificationResponseDTO } from "@/interfaces/api/notification";

export interface UseNotifications {
  notifications: NotificationResponseDTO[];
  isError: boolean;
  removeNotification: (notificationId: number) => void;
}
