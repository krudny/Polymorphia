import { useMutation } from "@tanstack/react-query";
import { UseDeleteNotification } from "@/hooks/notification/useDeleteNotification/types";
import NotificationService from "@/services/notification";

export default function useDeleteNotification(): UseDeleteNotification {
  const mutation = useMutation({
    mutationFn: (notificationId: number) =>
      NotificationService.deleteNotification(notificationId),
  });

  return { mutation };
}
