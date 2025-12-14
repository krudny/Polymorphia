import { API_HOST } from "@/services/api";

const NotificationService = {
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
