import { NotificationResponseDTO } from "@/interfaces/api/notification";

export interface NotificationCardProps {
  notification: NotificationResponseDTO;
  isNew?: boolean;
}

export interface NotificationCardCustomOptions {
  header: string;
  icon: string;
}
