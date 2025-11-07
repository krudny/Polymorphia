import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseDeleteNotification } from "@/hooks/notification/useDeleteNotification/types";
import NotificationService from "@/services/notification";

export default function useDeleteNotification(): UseDeleteNotification {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (notificationId: number) =>
      NotificationService.deleteNotification(notificationId),
  });

  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
    queryClient.invalidateQueries({ queryKey: ["notificationCount"] });
  };

  return { mutation, invalidateQueries };
}
