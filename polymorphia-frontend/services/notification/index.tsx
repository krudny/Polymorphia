import { API_HOST } from "@/services/api";
import { NotificationResponseDTO } from "@/interfaces/api/notification";

const NotificationService = {
  getAllNotifications: async (): Promise<NotificationResponseDTO[]> => {
    const response = await fetch(`${API_HOST}/notifications`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się pobrać powiadomień.");
    }

    return await response.json();
  },

  deleteNotification: async (notificationId: number): Promise<void> => {
    const response = await fetch(
      `${API_HOST}/notifications/${notificationId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Wystąpił błąd podczas usuwania powiadomienia.");
    }

    return;
  },
};

export default NotificationService;
