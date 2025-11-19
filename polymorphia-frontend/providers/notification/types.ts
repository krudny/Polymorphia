import { NotificationResponseDTO } from "@/interfaces/api/notification";

export interface NotificationContextInterface {
  isNotificationModalOpen: boolean;
  setIsNotificationModalOpen: (value: boolean) => void;
  notifications: NotificationResponseDTO[];
  notificationCount: number;
  isNotificationsError: boolean;
  removeNotification: (notificationId: number) => void;
  handleNotificationClick: (notification: NotificationResponseDTO) => void;
}
