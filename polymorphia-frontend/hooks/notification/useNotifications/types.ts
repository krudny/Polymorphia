import { NotificationResponseDTO } from "@/interfaces/api/notification";

export interface UseNotifications {
  data: NotificationResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
