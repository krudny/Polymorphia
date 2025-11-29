import { useMutation } from "@tanstack/react-query";
import { UseDeleteNotification } from "@/hooks/notification/useDeleteNotification/types";
import NotificationService from "@/services/notification";
import useNotificationContext from "@/hooks/contexts/useNotificationsContext";

export default function useDeleteNotification(): UseDeleteNotification {
  const { removeNotification } = useNotificationContext();

  const mutation = useMutation({
    mutationFn: async (notificationId: number) => {
      return NotificationService.deleteNotification(notificationId);
    },
    onSuccess: (data, notificationId) => {
      removeNotification(notificationId);
    },
  });

  return { mutation };
}
