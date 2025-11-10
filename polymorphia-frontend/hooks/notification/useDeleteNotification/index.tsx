import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseDeleteNotification } from "@/hooks/notification/useDeleteNotification/types";
import NotificationService from "@/services/notification";
import { NotificationResponseDTO } from "@/interfaces/api/notification";

export default function useDeleteNotification(): UseDeleteNotification {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (notificationId: number) =>
      NotificationService.deleteNotification(notificationId),

    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });

      const previousNotifications = queryClient.getQueryData<
        NotificationResponseDTO[]
      >(["notifications"]);

      queryClient.setQueryData<NotificationResponseDTO[]>(
        ["notifications"],
        (old) =>
          old
            ? old.filter((notification) => notification.id !== notificationId)
            : []
      );

      queryClient.setQueryData<number>(["notificationCount"], (old) =>
        old ? Math.max(0, old - 1) : 0
      );

      return { previousNotifications };
    },

    onError: (error, notificationId, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          ["notifications"],
          context.previousNotifications
        );
        queryClient.setQueryData(
          ["notificationCount"],
          context.previousNotifications.length
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notificationCount"] });
    },
  });

  return { mutation };
}
