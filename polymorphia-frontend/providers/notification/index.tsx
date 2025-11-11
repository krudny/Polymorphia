import { createContext, ReactNode, useEffect, useState } from "react";
import { NotificationContextInterface } from "@/providers/notification/types";
import useNotifications from "@/hooks/notification/useNotifications";
import { API_HOST } from "@/services/api";

export const NotificationContext = createContext<
  NotificationContextInterface | undefined
>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { data: notifications, isLoading, isError } = useNotifications();
  const [notificationCount, setNotificationCount] = useState<number>(0);

  useEffect(() => {
    const eventSource = new EventSource(`${API_HOST}/notifications/stream`, {
      withCredentials: true,
    });

    eventSource.onopen = () => {
      console.log("SSE connection opened");
    };

    eventSource.onmessage = (event) => {
      console.log("Received SSE message:", event.data);
      const count = parseInt(event.data, 10);
      setNotificationCount(count);
      console.log("Unread count updated:", count);
    };

    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      eventSource.close();
    };

    return () => {
      console.log("Closing SSE connection");
      eventSource.close();
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        isNotificationModalOpen,
        setIsNotificationModalOpen,
        notifications,
        isLoading,
        isError,
        notificationCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
