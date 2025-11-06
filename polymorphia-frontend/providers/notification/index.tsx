import { createContext, ReactNode, useState } from "react";
import { NotificationContextInterface } from "@/providers/notification/types";
import useNotifications from "@/hooks/notification/useNotifications";

export const NotificationContext = createContext<
  NotificationContextInterface | undefined
>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { data: notifications, isLoading, isError } = useNotifications();
  const notificationCount = notifications?.length ?? 0;

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
