import { NotificationResponseDTO } from "@/interfaces/api/notification";

export interface NotificationContextInterface {
  isNotificationModalOpen: boolean;
  setIsNotificationModalOpen: (value: boolean) => void;
  notifications: NotificationResponseDTO[] | undefined;
  notificationCount: number;
}
