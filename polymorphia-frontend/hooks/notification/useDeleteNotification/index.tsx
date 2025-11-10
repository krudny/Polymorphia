// useDeleteNotification.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseDeleteNotification } from "@/hooks/notification/useDeleteNotification/types";
import NotificationService from "@/services/notification";
import { NotificationResponseDTO } from "@/interfaces/api/notification"; // Dodaj typ

export default function useDeleteNotification(): UseDeleteNotification {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (notificationId: number) =>
      NotificationService.deleteNotification(notificationId),

    // ✅ Optimistic update - natychmiast usuń z cache PRZED requestem
    onMutate: async (notificationId) => {
      // Anuluj outgoing refetches (nie nadpisuj optimistic update)
      await queryClient.cancelQueries({ queryKey: ["notifications"] });

      // Snapshot poprzedniego stanu (do rollback w razie błędu)
      const previousNotifications = queryClient.getQueryData<
        NotificationResponseDTO[]
      >(["notifications"]);

      // Optimistically update - usuń z cache
      queryClient.setQueryData<NotificationResponseDTO[]>(
        ["notifications"],
        (old) => (old ? old.filter((n) => n.id !== notificationId) : [])
      );

      // Zaktualizuj count
      queryClient.setQueryData<number>(["notificationCount"], (old) =>
        old ? Math.max(0, old - 1) : 0
      );

      // Zwróć context do rollback
      return { previousNotifications };
    },

    // ✅ Rollback w razie błędu
    onError: (err, notificationId, context) => {
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

    // ✅ Zawsze refetch po zakończeniu (synchronizuj z serwerem)
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notificationCount"] });
    },
  });

  return { mutation };
}
